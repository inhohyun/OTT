package ssafy.c205.ott.domain.lookbook.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.common.entity.LookbookTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookFavoriteDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.LookbookDetailDto;
import ssafy.c205.ott.domain.lookbook.entity.ActiveStatus;
import ssafy.c205.ott.domain.lookbook.entity.Favorite;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.entity.Tag;
import ssafy.c205.ott.domain.lookbook.repository.FavoriteRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookTagRepository;
import ssafy.c205.ott.domain.lookbook.repository.TagRepository;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
public class LookbookServiceImpl implements LookbookService {

    @Autowired
    private LookbookRepository lookbookRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private LookbookTagRepository lookbookTagRepository;
    @Autowired
    private FavoriteRepository favoriteRepository;

    @Override
    public void createLookbook(LookbookDto lookbookCreateDto) {
        Lookbook lookbook = new Lookbook();
        //유저정보 입력
        //Todo : 병합 후 유저 정보 넣기
//        lookbook.setMember();

        //내용 설정
        lookbook.setContent(lookbookCreateDto.getContent());
        log.info("Lookbook 입력내용 = {}, 들어간 내용 = {}", lookbookCreateDto.getContent(),
            lookbook.getContent());

        //공개여부 설정
        lookbook.setPublicStatus(lookbookCreateDto.getPublicStatus());
        log.info("Lookbook 입력 공개여부 = {}, 들어간 내용 = {}", lookbookCreateDto.getPublicStatus(),
            lookbook.getContent());

        //룩북 생성 날짜 저장
        lookbook.setCreatedAt(LocalDateTime.now());

        //태그 유무 확인 및 태그 추가
        List<LookbookTag> lookbookTags = new ArrayList<>();
        for (String tag : lookbookCreateDto.getTags()) {
            Tag tagEntity = tagRepository.findByName(tag);
            if (tagEntity == null) {
                tagEntity = new Tag();
                tagEntity.setName(tag);
                tagEntity.setCount(1L);
                tagRepository.save(tagEntity);
            } else {
                Long tagCnt = tagEntity.getCount();
                tagEntity.setCount(tagCnt + 1L);
                tagRepository.save(tagEntity);
            }
            LookbookTag lookbookTag = new LookbookTag();
            lookbookTag.setLookbook(lookbook);
            lookbookTag.setTag(tagRepository.findByName(tag));
            lookbookTags.add(lookbookTag);
        }
        //옷 사진 추가하기
        //Todo : 옷 끝나면 옷 정보 및 사진 넣기

        //룩북 추가하기
        lookbookRepository.save(lookbook);
    }

    @Override
    public LookbookDetailDto detailLookbook(String lookbookId) {
        Optional<Lookbook> odl = lookbookRepository.findById(Long.parseLong(lookbookId));
        LookbookDetailDto lookbookDetailDto = new LookbookDetailDto();
        Lookbook lookbook = null;
        if (odl.isPresent()) {
            lookbook = odl.get();
            lookbookDetailDto.setContent(lookbook.getContent());
            lookbookDetailDto.setId(lookbook.getId());
            lookbookDetailDto.setLookbookItems(lookbook.getLookbookItemList());
            lookbookDetailDto.setLookbookImages(lookbook.getLookbookImages());
            lookbookDetailDto.setLookbookTags(lookbook.getLookbookTags());
            lookbookDetailDto.setMember(lookbook.getMember());
            lookbookDetailDto.setHitCount(lookbook.getHitCount() + 1);
            lookbookDetailDto.setCreatedAt(lookbook.getCreatedAt());
            lookbook.setHitCount(lookbook.getHitCount() + 1);
            lookbookRepository.save(lookbook);
            return lookbookDetailDto;
        } else {
            log.error("{}아이디를 갖은 룩북을 찾지 못했습니다.", lookbookId);
            return null;
        }
    }

    @Override
    public boolean deleteLookbook(String lookbookId) {
        //룩북 불러오기
        Optional<Lookbook> ol = lookbookRepository.findById(Long.parseLong(lookbookId));
        Lookbook lookbook = null;
        if (ol.isPresent()) {
            lookbook = ol.get();
            //태그 카운트 줄이기
            for (LookbookTag lookbookTag : lookbook.getLookbookTags()) {
                Tag tag = lookbookTag.getTag();
                tag.setCount(tag.getCount() - 1);
                tagRepository.save(tag);
                lookbookTagRepository.deleteById(lookbookTag.getId());
            }
            //룩북 삭제
            lookbook.setActiveStatus(ActiveStatus.INACTIVE);
            log.info("룩북 제거 성공");
            return true;
        } else {
            log.error("{}아이디를 갖은 룩북을 찾지 못했습니다.", lookbookId);
            return false;
        }
    }

    @Override
    public boolean updateLookbook(String lookbookId, LookbookDto lookbookUpdateDto) {
        Optional<Lookbook> ol = lookbookRepository.findById(Long.parseLong(lookbookId));
        if (ol.isPresent()) {
            Lookbook lookbook = ol.get();
            lookbook.setPublicStatus(lookbookUpdateDto.getPublicStatus());  //공개여부 수정
            lookbook.setContent(lookbookUpdateDto.getContent());            //본문 수정

            //기존 태그 삭제
            for (LookbookTag lookbookTag : lookbook.getLookbookTags()) {
                Tag tag = lookbookTag.getTag();
                tag.setCount(tag.getCount() - 1);
                tagRepository.save(tag);
                lookbookTagRepository.delete(lookbookTag);
            }

            //신규 태그 등록
            for (String tag : lookbookUpdateDto.getTags()) {
                Tag tagEntity = tagRepository.findByName(tag);
                if (tagEntity == null) {
                    tagEntity = new Tag();
                    tagEntity.setName(tag);
                    tagEntity.setCount(1L);
                    tagRepository.save(tagEntity);
                } else {
                    tagEntity.setCount(tagEntity.getCount() + 1L);
                    tagRepository.save(tagEntity);
                }
            }

            //옷 정보 수정
            //Todo : 옷 부분 끝나고 옷 정보 수정 구현

            lookbookRepository.save(lookbook);
            return true;
        } else {
            return false;
        }
    }

    //Todo : 멤버값(Member) 넣어주기
    @Override
    public boolean likeLookbook(LookbookFavoriteDto lookbookFavoriteDto) {
        Optional<Lookbook> ol = lookbookRepository.findById(
            Long.valueOf(lookbookFavoriteDto.getLookbookId()));
        if (ol.isPresent()) {
            Lookbook lookbook = ol.get();
            favoriteRepository.save(new Favorite(lookbook));
            return true;
        } else {
            return false;
        }
    }

    @Override
    public int cntLikeLookbook(String lookbookId) {
        List<Favorite> lookbookLikes = favoriteRepository.findByLookbookId(
            Long.parseLong(lookbookId));
        if (lookbookLikes == null) {
            return -1;
        }
        int cntLike = lookbookLikes.size();
        return cntLike;
    }

    // Todo : 룩북 썸네일 경로, 룩북의 유저정보, 생성일자로 보내줄 것
    @Override
    public List<Lookbook> findPublicLookbooks(String uid) {
        return lookbookRepository.findByMemberIdAndPublicStatus(Long.parseLong(uid),
            PublicStatus.PUBLIC);
    }

    // Todo : 룩북 썸네일 경로, 룩북의 유저정보, 생성일자로 보내줄 것
    @Override
    public List<Lookbook> findPrivateLookbooks(String uid) {
        return lookbookRepository.findByMemberIdAndPublicStatus(Long.parseLong(uid),
            PublicStatus.PRIVATE);
    }

    @Override
    public List<Lookbook> findByTag(String[] tags) {
        HashMap<Long, Integer> map = new HashMap<>();
        for (String tag : tags) {
            Tag tagEntity = tagRepository.findByName(tag);
            //태그가 존재하지 않으면 다음 태그로 넘어감
            if (tagEntity == null) {
                continue;
            }

            //태그가 포함된 룩북들을 가지고 옴
            List<LookbookTag> findLookbooks = lookbookTagRepository.findByTagName(tag);
            for (LookbookTag findLookbook : findLookbooks) {
                Lookbook lookbook = findLookbook.getLookbook();
                long id = lookbook.getId();

                //검색 태그 카운팅
                if (map.containsKey(id)) {
                    map.put(id, map.get(id) + 1);
                } else {
                    map.put(id, 1);
                }
            }
        }
        // Hashmap value값을 기반으로 sort
        List<Long> keys = new ArrayList<>(map.keySet());
        Collections.sort(keys, (v1, v2) -> (map.get(v2).compareTo(map.get(v1))));

        // sort된 key값(lookbookid)로 룩북 정보를 가져와 리스트에 저장
        List<Lookbook> lookbooks = new ArrayList<>();
        for (Long key : keys) {
            Optional<Lookbook> ol = lookbookRepository.findById(key);
            if (ol.isPresent()) {
                Lookbook lookbook = ol.get();
                lookbooks.add(lookbook);
            }
        }

        //return
        return lookbooks;
    }
}
