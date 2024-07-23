package ssafy.c205.ott.domain.lookbook.service;

import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookCreateDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.LookbookDetailDto;

public interface LookbookService {
    void createLookbook(LookbookCreateDto lookbookCreateDto);

    LookbookDetailDto detailLookbook(String lookbookId);

}
