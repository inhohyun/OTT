package ssafy.c205.ott.domain.lookbook.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.common.entity.LookbookItem;
import ssafy.c205.ott.common.entity.LookbookTag;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.item.Repository.ItemRepository;
import ssafy.c205.ott.domain.item.entity.Item;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookFavoriteDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.FindLookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.LookbookDetailDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.TagLookbookDto;
import ssafy.c205.ott.domain.lookbook.entity.ActiveStatus;
import ssafy.c205.ott.domain.lookbook.entity.Favorite;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.entity.LookbookImage;
import ssafy.c205.ott.domain.lookbook.entity.LookbookImageStatus;
import ssafy.c205.ott.domain.lookbook.entity.Tag;
import ssafy.c205.ott.domain.lookbook.repository.FavoriteRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookItemRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookRepository;
import ssafy.c205.ott.domain.lookbook.repository.LookbookTagRepository;
import ssafy.c205.ott.domain.lookbook.repository.TagRepository;
import ssafy.c205.ott.util.AmazonS3Util;

@Slf4j
@Service
@RequiredArgsConstructor
public class LookbookServiceImpl implements LookbookService {

    private final LookbookRepository lookbookRepository;
    private final TagRepository tagRepository;
    private final LookbookTagRepository lookbookTagRepository;
    private final FavoriteRepository favoriteRepository;
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final LookbookItemRepository lookbookItemRepository;
    private final AmazonS3Util amazonS3Util;

    @Override
    public void createLookbook(LookbookDto lookbookCreateDto, MultipartFile file) {
        //태그 유무 확인 및 태그 추가
        List<LookbookTag> lookbookTags = new ArrayList<>();
        Optional<Member> om = memberRepository.findByIdAndActiveStatus(
            Long.parseLong(lookbookCreateDto.getUid()),
            ssafy.c205.ott.domain.account.entity.ActiveStatus.ACTIVE);
        Member member = null;
        if (om.isPresent()) {
            member = om.get();
        } else {
            log.error("멤버를 찾을 수 없음");
        }

        Lookbook saveLookbook = lookbookRepository.save(Lookbook
            .builder()
            .content(lookbookCreateDto.getContent())
            .member(member)
            .publicStatus(lookbookCreateDto.getPublicStatus())
            .build());

        for (String tag : lookbookCreateDto.getTags()) {
            Tag tagEntity = tagRepository.findByName(tag);
            if (tagEntity == null) {
                tagRepository.save(Tag
                    .builder()
                    .name(tag)
                    .count(1L)
                    .build());
            } else {
                tagRepository.save(Tag
                    .builder()
                    .id(tagEntity.getId())
                    .name(tagEntity.getName())
                    .count(tagEntity.getCount() + 1)
                    .build());
            }
            lookbookTags.add(LookbookTag
                .builder()
                .lookbook(saveLookbook)
                .tag(tagRepository.findByName(tag))
                .build());
        }
        //옷 사진 추가하기
        //옷 정보 넣기
        String s3URL = amazonS3Util.saveFile(file);

        List<LookbookItem> lookbookItems = new ArrayList<>();
        for (String clothId : lookbookCreateDto.getClothes()) {
            Optional<Item> oi = itemRepository.findById(Long.parseLong(clothId));
            if (oi.isPresent()) {
                Item item = oi.get();
                LookbookItem lookbookItem = LookbookItem
                    .builder()
                    .item(item)
                    .lookbook(saveLookbook)
                    .build();
                lookbookItemRepository.save(lookbookItem);
                lookbookItems.add(lookbookItem);
            }
        }
        List<LookbookImage> lookbookImages = new ArrayList<>();
        lookbookImages.add(LookbookImage
            .builder()
            .imageUrl(s3URL)
            .lookbookImageStatus(LookbookImageStatus.THUMBNAIL)
            .lookbook(saveLookbook)
            .build());

        //룩북 추가하기
        lookbookRepository.save(Lookbook
            .builder()
            .id(saveLookbook.getId())
            .lookbookItemList(lookbookItems)
            .lookbookImages(lookbookImages)
            .lookbookTags(lookbookTags)
            .build());
    }

    //Todo : Item에서 옷 사진들 가져와서 responseDto에 저장해서 넘기는거 추가
    @Override
    public LookbookDetailDto detailLookbook(String lookbookId) {
        Optional<Lookbook> odl = lookbookRepository.findById(Long.parseLong(lookbookId));
        Lookbook lookbook = null;
        if (odl.isPresent()) {
            lookbook = odl.get();
            lookbookRepository.save(Lookbook
                .builder()
                .id(lookbook.getId())
                .hitCount(lookbook.getHitCount() + 1)
                .build());
            return LookbookDetailDto
                .builder()
                .content(lookbook.getContent())
                .lookbookItems(lookbook.getLookbookItemList())
                .lookbookImages(lookbook.getLookbookImages())
                .lookbookTags(lookbook.getLookbookTags())
                .member(lookbook.getMember())
                .hitCount(lookbook.getHitCount() + 1)
                .createdAt(lookbook.getCreatedAt())
                .build();
        } else {
            log.error("{}아이디를 갖은 룩북을 찾지 못했습니다.", lookbookId);
            return null;
        }
    }

    //Todo : 룩북 삭제시 LookbookItem 삭제로직 추가
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
                if (tag.getCount() == 1) {
                    tagRepository.delete(tag);
                } else {
                    tagRepository.save(Tag
                        .builder()
                        .id(tag.getId())
                        .count(tag.getCount() - 1)
                        .build());
                }
                lookbookTagRepository.deleteById(lookbookTag.getId());
            }
            //룩북 삭제
            lookbookRepository.save(Lookbook
                .builder()
                .id(lookbook.getId())
                .activeStatus(ActiveStatus.INACTIVE)
                .build());
            log.info("룩북 제거 성공");
            return true;
        } else {
            log.error("{}아이디를 갖은 룩북을 찾지 못했습니다.", lookbookId);
            return false;
        }
    }

    //Todo : LookbookItem 수정 로직 추가
    @Override
    public boolean updateLookbook(String lookbookId, LookbookDto lookbookUpdateDto) {
        Optional<Lookbook> ol = lookbookRepository.findById(Long.parseLong(lookbookId));
        List<LookbookTag> lookbookTags = new ArrayList<>();
        if (ol.isPresent()) {
            Lookbook lookbook = ol.get();

            //기존 태그 삭제
            for (LookbookTag lookbookTag : lookbook.getLookbookTags()) {
                Tag tag = lookbookTag.getTag();
                if (tag.getCount() == 1) {
                    tagRepository.delete(tag);
                } else {
                    tagRepository.save(Tag.builder()
                        .id(tag.getId())
                        .count(tag.getCount() - 1)
                        .build());
                }
                lookbookTagRepository.delete(lookbookTag);
            }

            //신규 태그 등록
            for (String tag : lookbookUpdateDto.getTags()) {
                Tag tagEntity = tagRepository.findByName(tag);
                if (tagEntity == null) {
                    tagRepository.save(Tag
                        .builder()
                        .name(tag)
                        .count(1L)
                        .build());
                } else {
                    tagRepository.save(Tag
                        .builder()
                        .id(tagEntity.getId())
                        .count(tagEntity.getCount() + 1)
                        .build());
                }
                LookbookTag lookbookTag = LookbookTag
                    .builder()
                    .tag(tagRepository.findByName(tag))
                    .lookbook(lookbook)
                    .build();
                lookbookTagRepository.save(lookbookTag);
                lookbookTags.add(lookbookTag);
            }

            //옷 정보 수정
            //Todo : 옷 부분 끝나고 옷 정보 수정 구현

            //Todo : 옷 사진이랑 옷정보 수정정보 넣읅것
            lookbookRepository.save(Lookbook
                .builder()
                .id(lookbook.getId())
                .publicStatus(lookbookUpdateDto.getPublicStatus())
                .content(lookbookUpdateDto.getContent())
                .lookbookTags(lookbookTags)
                .build());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean likeLookbook(LookbookFavoriteDto lookbookFavoriteDto) {
        Optional<Member> om = memberRepository.findByIdAndActiveStatus(
            Long.parseLong(lookbookFavoriteDto.getUid()),
            ssafy.c205.ott.domain.account.entity.ActiveStatus.ACTIVE);
        Member member = null;
        if (om.isPresent()) {
            member = om.get();
        } else {
            log.error("사용자를 찾을 수 없음 ");
            return false;
        }
        Optional<Lookbook> ol = lookbookRepository.findById(
            Long.valueOf(lookbookFavoriteDto.getLookbookId()));
        if (ol.isPresent()) {
            Lookbook lookbook = ol.get();
            favoriteRepository.save(Favorite
                .builder()
                .member(member)
                .lookbook(lookbook)
                .build());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean dislikeLookbook(LookbookFavoriteDto lookbookFavoriteDto) {
        Favorite favoriteLookbook = favoriteRepository.findByLookbookIdAndMemberId(
            Long.parseLong(lookbookFavoriteDto.getLookbookId()),
            Long.parseLong(lookbookFavoriteDto.getUid()));
        favoriteRepository.delete(favoriteLookbook);
        return true;
    }

    @Override
    public int cntLikeLookbook(String lookbookId) {
        List<Favorite> lookbookLikes = favoriteRepository.findByLookbookId(
            Long.parseLong(lookbookId));
        if (lookbookLikes == null) {
            return -1;
        }
        return lookbookLikes.size();
    }

    @Override
    public List<FindLookbookDto> findPublicLookbooks(String uid) {
        List<Lookbook> lookbooks = lookbookRepository.findByMemberIdAndPublicStatusAndActiveStatus(
            Long.parseLong(uid),
            PublicStatus.PUBLIC, ActiveStatus.ACTIVE);
        List<FindLookbookDto> findLookbookDtos = new ArrayList<>();
        for (Lookbook lookbook : lookbooks) {
            for (LookbookImage lookbookImage : lookbook.getLookbookImages()) {
                if (lookbookImage.getLookbookImageStatus() == LookbookImageStatus.THUMBNAIL) {
                    findLookbookDtos.add(FindLookbookDto
                        .builder()
                        .uid(lookbook.getMember().getId())
                        .createdAt(lookbook.getCreatedAt())
                        .imageURL(lookbookImage.getImageUrl())
                        .build());
                }
            }
        }
        return findLookbookDtos;
    }

    @Override
    public List<FindLookbookDto> findPrivateLookbooks(String uid) {
        List<Lookbook> lookbooks = lookbookRepository.findByMemberIdAndPublicStatusAndActiveStatus(
            Long.parseLong(uid),
            PublicStatus.PRIVATE, ActiveStatus.ACTIVE);
        List<FindLookbookDto> findLookbookDtos = new ArrayList<>();
        for (Lookbook lookbook : lookbooks) {
            for (LookbookImage lookbookImage : lookbook.getLookbookImages()) {
                if (lookbookImage.getLookbookImageStatus() == LookbookImageStatus.THUMBNAIL) {
                    findLookbookDtos.add(FindLookbookDto
                        .builder()
                        .uid(lookbook.getMember().getId())
                        .createdAt(lookbook.getCreatedAt())
                        .imageURL(lookbookImage.getImageUrl())
                        .build());
                }
            }
        }
        return findLookbookDtos;
    }

    @Override
    public List<TagLookbookDto> findByTag(String[] tags) {
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
                //삭제된 게시물이면 나오면 안됨
                if (lookbook.getActiveStatus() == ActiveStatus.INACTIVE) {
                    continue;
                }
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
        List<TagLookbookDto> lookbooks = new ArrayList<>();
        for (Long key : keys) {
            Optional<Lookbook> ol = lookbookRepository.findById(key);
            if (ol.isPresent()) {
                Lookbook lookbook = ol.get();
                lookbooks.add(TagLookbookDto
                    .builder()
                    .id(lookbook.getId())
                    .hitCount(lookbook.getHitCount())
                    .content(lookbook.getContent())
                    .publicStatus(lookbook.getPublicStatus())
                    .activeStatus(lookbook.getActiveStatus())
                    .member(lookbook.getMember())
                    .lookbookItemList(lookbook.getLookbookItemList())
                    .lookbookTags(lookbook.getLookbookTags())
                    .comments(lookbook.getComments())
                    .lookbookImages(lookbook.getLookbookImages())
                    .build()
                );
            }
        }
        return lookbooks;
    }
}
