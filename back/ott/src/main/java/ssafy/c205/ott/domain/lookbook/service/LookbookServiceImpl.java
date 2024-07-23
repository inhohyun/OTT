package ssafy.c205.ott.domain.lookbook.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.common.entity.LookbookTag;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookCreateDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.LookbookDetailDto;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.entity.Tag;
import ssafy.c205.ott.domain.lookbook.repository.LookbookRepository;
import ssafy.c205.ott.domain.lookbook.repository.TagRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class LookbookServiceImpl implements LookbookService {
    @Autowired
    private LookbookRepository lookbookRepository;
    @Autowired
    private TagRepository tagRepository;

    @Override
    public void createLookbook(LookbookCreateDto lookbookCreateDto) {
        Lookbook lookbook = new Lookbook();
        //유저정보 입력 -> 병합 후 진행
//        lookbook.setMember();

        //내용 설정
        lookbook.setContent(lookbookCreateDto.getContent());
        log.info("Lookbook 입력내용 = {}, 들어간 내용 = {}", lookbookCreateDto.getContent(), lookbook.getContent());

        //공개여부 설정
        lookbook.setPublicStatus(lookbookCreateDto.getPublicStatus());
        log.info("Lookbook 입력 공개여부 = {}, 들어간 내용 = {}", lookbookCreateDto.getPublicStatus(), lookbook.getContent());

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
        //옷 사진 추가하기 -> 옷 구역 끝나고 진행

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
            lookbook.setHitCount(lookbook.getHitCount() + 1);
            lookbookRepository.save(lookbook);
            return lookbookDetailDto;
        } else {
            log.error("{}아이디를 갖은 룩북을 찾지 못했습니다.", lookbookId);
            return null;
        }
    }
}
