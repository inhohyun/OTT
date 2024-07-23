package ssafy.c205.ott.domain.lookbook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.common.entity.LookbookTag;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookCreateDto;
import ssafy.c205.ott.domain.lookbook.entity.Lookbook;
import ssafy.c205.ott.domain.lookbook.entity.Tag;
import ssafy.c205.ott.domain.lookbook.repository.LookbookRepository;
import ssafy.c205.ott.domain.lookbook.repository.TagRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class LookbookServiceImpl implements LookbookService {
    @Autowired
    private LookbookRepository lookbookRepository;
    @Autowired
    private TagRepository tagRepository;

    @Override
    public void createLookbook(LookbookCreateDto lookbookCreateDto) {
        Lookbook lookbook = new Lookbook();
        //유저정보 입력
//        lookbook.setMember();

        List<LookbookTag> lookbookTags = new ArrayList<>();
        //태그 유무 확인
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
        //룩북 추가하기
    }
}
