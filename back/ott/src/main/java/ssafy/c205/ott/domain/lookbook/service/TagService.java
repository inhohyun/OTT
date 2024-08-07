package ssafy.c205.ott.domain.lookbook.service;

import ssafy.c205.ott.domain.lookbook.entity.Tag;

public interface TagService {
    void addTag(String tagName);
    Tag getTag(String tagName);
    void deleteTag(String tagName);
}
