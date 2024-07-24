package ssafy.c205.ott.domain.lookbook.service;

import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookFavoriteDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.LookbookDetailDto;

public interface LookbookService {
    void createLookbook(LookbookDto lookbookCreateDto);

    LookbookDetailDto detailLookbook(String lookbookId);

    boolean deleteLookbook(String lookbookId);

    boolean updateLookbook(String lookbookId, LookbookDto lookbookUpdateDto);

    boolean likeLookbook(LookbookFavoriteDto lookbookFavoriteDto);
}
