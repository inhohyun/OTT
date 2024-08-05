package ssafy.c205.ott.domain.item.service;

import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.domain.item.dto.requestdto.ItemCreateDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemListResponseDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemResponseDto;

import java.util.List;

public interface ItemService {
    void createItem(ItemCreateDto itemCreateDto, List<MultipartFile> files);
    void updateItem(Long clothesId, ItemCreateDto itemCreateDto, List<MultipartFile> files);
    void deleteItem(Long clothesId);
    ItemResponseDto selectItem(Long clothesId);
    List<ItemListResponseDto> selectItemList(Long uid);
}
