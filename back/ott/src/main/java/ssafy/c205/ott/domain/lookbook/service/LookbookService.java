package ssafy.c205.ott.domain.lookbook.service;

import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookFavoriteDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.FindLookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.LookbookDetailDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.TagLookbookDto;

import java.util.List;

public interface LookbookService {
    void createLookbook(LookbookDto lookbookCreateDto, MultipartFile file);

    LookbookDetailDto detailLookbook(String lookbookId);

    boolean deleteLookbook(String lookbookId);

    boolean updateLookbook(String lookbookId, LookbookDto lookbookUpdateDto);

    boolean likeLookbook(LookbookFavoriteDto lookbookFavoriteDto);

    boolean dislikeLookbook(LookbookFavoriteDto lookbookFavoriteDto);

    int cntLikeLookbook(String lookbookId);

    List<FindLookbookDto> findPublicLookbooks(String uid);

    List<FindLookbookDto> findPrivateLookbooks(String uid);

    List<TagLookbookDto> findByTag(String[] tags);
}
