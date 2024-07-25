package ssafy.c205.ott.domain.lookbook.service;

import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.lookbook.entity.Tag;
import ssafy.c205.ott.domain.lookbook.repository.TagRepository;

@Slf4j
@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private TagRepository tagRepository;

    @Override
    public void addTag(String tagName) {
        Tag tagEntity = tagRepository.findByName(tagName);
        if (tagEntity == null) {
            Tag tag = new Tag(tagName, 1L);
            tag.setCreatedAt(LocalDateTime.now());
            tagRepository.save(tag);
        } else {
            tagEntity.setCount(tagEntity.getCount() + 1L);
            tagRepository.save(tagEntity);
        }
        log.info("{} 태그 생성됨", tagRepository.findByName(tagName));
    }

    @Override
    public Tag getTag(String tagName) {
        return tagRepository.findByName(tagName);
    }

    @Override
    public void deleteTag(String tagName) {
        Tag tagEntity = tagRepository.findByName(tagName);
        
        //태그를 찾지 못한 경우
        if (tagEntity == null) {
            log.error("{} 이름의 태그를 찾지 못했습니다", tagName);
            return;
        }
        
        //태그를 찾은 경우
        tagEntity.setCount(tagEntity.getCount() - 1);
        if (tagEntity.getCount() == 0) {
            //태그의 카운트가 0개면 태그를 삭제
            tagRepository.delete(tagEntity);
            return;
        }
        
        //그게 아니라면 태그 카운트 수 최신화
        tagRepository.save(tagEntity);
    }
}
