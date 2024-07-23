package ssafy.c205.ott.domain.lookbook.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.common.entity.LookbookTag;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookCreateDto;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.entity.Tag;
import ssafy.c205.ott.domain.lookbook.repository.LookbookRepository;
import ssafy.c205.ott.domain.lookbook.repository.TagRepository;

import java.util.ArrayList;
import java.util.List;

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
}
