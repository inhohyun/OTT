package ssafy.c205.ott.domain.item.service;

import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.domain.item.dto.requestdto.ItemCreateDto;
import ssafy.c205.ott.domain.item.dto.requestdto.ItemUpdateDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemCategoryResponseDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemListResponseDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemResponseDto;

import java.util.List;

public interface ItemService {

    void createItem(ItemCreateDto itemCreateDto, MultipartFile frontImg, MultipartFile backImg);

    void updateItem(Long clothesId, ItemUpdateDto itemUpdateDto, MultipartFile frontImg, MultipartFile backImg);

    void deleteItem(Long clothesId);

    ItemResponseDto selectItem(Long clothesId);

    List<ItemListResponseDto> selectItemList(Long memberId);

    void bookmarkClothes(Long clothesId);

    void unbookmarkClothes(Long clothesId);

    List<ItemCategoryResponseDto> selectByCategory(Long categoryId, Long memberId, Long closetId);

    List<ItemCategoryResponseDto> selectByBookmark(Long memberId);

    List<ItemListResponseDto> selectByRtcList(Long memberId);

    List<ItemCategoryResponseDto> selectByRtcCategoryList(Long memberId, Long categoryId, Long closetId);
}
