package ssafy.c205.ott.domain.lookbook.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ssafy.c205.ott.domain.lookbook.entity.Tag;
import ssafy.c205.ott.domain.lookbook.repository.TagRepository;

@Slf4j
@RequiredArgsConstructor
@Service
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public void addTag(String tagName) {
        Tag tagEntity = tagRepository.findByName(tagName);
        if (tagEntity == null) {
            tagRepository.save(Tag.builder()
                .name(tagName)
                .count(1L)
                .build());
        } else {
            tagEntity.tagAdd();
        }
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
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, tagName + "의 태그를 찾지 못했습니다.");
        }

        //태그를 찾은 경우
        if (tagEntity.getCount() == 1) {
            tagRepository.delete(tagEntity);
        } else {
            tagEntity.tagMinus();
        }
    }
}
