package ssafy.c205.ott.domain.lookbook.service;

import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookCreateDto;

public interface LookbookService {
    void createLookbook(LookbookCreateDto lookbookCreateDto);
}
