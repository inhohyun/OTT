package ssafy.c205.ott.domain.lookbook.service;

import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookFavoriteDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.LookbookSearchDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.FindLookbookDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.FollowLookbookResponseDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.LookbookDetailDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.LookbookMineDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.TagLookbookDto;

import java.util.List;

public interface LookbookService {
    void createLookbook(LookbookDto lookbookCreateDto, MultipartFile file);

    LookbookDetailDto detailLookbook(String lookbookId, Long uid);

    boolean deleteLookbook(String lookbookId);

    boolean updateLookbook(String lookbookId, LookbookDto lookbookUpdateDto, MultipartFile file);

    boolean likeLookbook(LookbookFavoriteDto lookbookFavoriteDto);

    boolean dislikeLookbook(LookbookFavoriteDto lookbookFavoriteDto);

    int cntLikeLookbook(String lookbookId);

    List<FindLookbookDto> findPublicLookbooks(String uid);

    List<FindLookbookDto> findPrivateLookbooks(String uid);

    List<TagLookbookDto> findByTag(LookbookSearchDto lookbookSearchDto);

    int countLookbook(String uid);

    List<LookbookMineDto> findMineLookbooks(String uid);

    List<FollowLookbookResponseDto> findFollowingLookbooks(String uid);
}
