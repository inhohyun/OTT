package ssafy.c205.ott.domain.item.service;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.common.entity.ItemCategory;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.common.util.AmazonS3Util;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.exception.MemberNotFoundException;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.category.entity.Category;
import ssafy.c205.ott.domain.category.exception.CategoryNotFoundException;
import ssafy.c205.ott.domain.category.repository.CategoryRepository;
import ssafy.c205.ott.domain.closet.dto.ClosetDto;
import ssafy.c205.ott.domain.closet.service.ClosetService;
import ssafy.c205.ott.domain.item.dto.requestdto.ItemCreateDto;
import ssafy.c205.ott.domain.item.dto.requestdto.ItemUpdateDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemCategoryResponseDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemListResponseDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemResponseDto;
import ssafy.c205.ott.domain.item.entity.BookmarkStatus;
import ssafy.c205.ott.domain.item.entity.Item;
import ssafy.c205.ott.domain.item.entity.ItemImage;
import ssafy.c205.ott.domain.item.entity.ItemStatus;
import ssafy.c205.ott.domain.item.exception.ClothesFindException;
import ssafy.c205.ott.domain.item.exception.ImageNotFoundException;
import ssafy.c205.ott.domain.item.exception.ItemCategoryNotFoundException;
import ssafy.c205.ott.domain.item.repository.ItemCategoryRepository;
import ssafy.c205.ott.domain.item.repository.ItemImageRepository;
import ssafy.c205.ott.domain.item.repository.ItemRepository;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;
    private final AmazonS3Util amazonS3Util;
    private final ItemImageRepository itemImageRepository;
    private final ClosetService closetService;
    private final CategoryRepository categoryRepository;
    private final ItemCategoryRepository itemCategoryRepository;

    @Override
    public void createItem(ItemCreateDto itemCreateDto, MultipartFile frontImg,
        MultipartFile backImg) {
        Member member = memberRepository.findByIdAndActiveStatus(itemCreateDto.getMemberId(),
            ActiveStatus.ACTIVE).orElseThrow(MemberNotFoundException::new);

        //빈 객체 생성
        Item saveItem = itemRepository.save(Item.builder().member(member).build());

        //이미지 저장
        List<String> urls = new ArrayList<>();

        if (frontImg != null) {
            urls.add(amazonS3Util.saveFile(frontImg));
        } else {
            throw new ImageNotFoundException();
        }

        if (backImg != null) {
            urls.add(amazonS3Util.saveFile(backImg));
        }

        List<ItemImage> itemImages = new ArrayList<>();
        int idx = 0;
        for (String url : urls) {
            ItemImage saveImage = itemImageRepository.save(
                ItemImage
                    .builder()
                    .itemStatus(idx++ == 0 ? ItemStatus.FRONT : ItemStatus.BACK)
                    .itemImagePath(url)
                    .item(saveItem)
                    .build());

            itemImages.add(saveImage);
        }

        //옷 저장
        //closet id 가져오기
        List<ClosetDto> closets = closetService.findByMemberId(itemCreateDto.getMemberId());
        Long closetId = closets.get(0).getId();

        Category category = categoryRepository.findById(itemCreateDto.getCategoryId()).orElseThrow(
            CategoryNotFoundException::new);

        List<ItemCategory> categories = new ArrayList<>();
        categories.add(ItemCategory.builder().category(category).item(saveItem).build());
        itemCategoryRepository.save(
            ItemCategory
                .builder()
                .item(saveItem)
                .category(category)
                .build());

        itemRepository.save(Item
            .builder()
            .id(saveItem.getId())
            .color(itemCreateDto.getColor())
            .sex(itemCreateDto.getGender())
            .brand(itemCreateDto.getBrand())
            .member(member)
            .itemImages(itemImages)
            .size(itemCreateDto.getSize())
            .itemCategories(categories)
            .purchase(itemCreateDto.getPurchase())
            .publicStatus(itemCreateDto.getPublicStatus())
            .salesStatus(itemCreateDto.getSalesStatus())
            .bookmarkStatus(BookmarkStatus.NOT_BOOKMARKING)
            .build());
    }

    @Override
    public Item updateItem(Long clothesId, ItemUpdateDto itemUpdateDto, MultipartFile frontImg,
        MultipartFile backImg) {
        //이전 정보 가져오기
        Item item = itemRepository.findById(clothesId).orElseThrow(ClothesFindException::new);
        List<ItemImage> itemImages = item.getItemImages();
        if (frontImg != null) {
            amazonS3Util.deleteFile(item.getItemImages().get(0).getItemImagePath());
            itemImageRepository.delete(item.getItemImages().get(0));

            itemImages.set(0,
                ItemImage
                    .builder()
                    .itemImagePath(amazonS3Util.saveFile(frontImg))
                    .item(item)
                    .itemStatus(ItemStatus.FRONT)
                    .build());
        }

        if (backImg != null) {
            amazonS3Util.deleteFile(item.getItemImages().get(1).getItemImagePath());
            itemImageRepository.delete(item.getItemImages().get(1));

            itemImages.set(1, ItemImage
                .builder()
                .itemImagePath(amazonS3Util.saveFile(backImg))
                .itemStatus(ItemStatus.BACK)
                .item(item)
                .build());
        }

        //카테고리 변경
        //closet id 가져오기
        List<ClosetDto> closets = closetService.findByMemberId(itemUpdateDto.getMemberId());
        Long closetId = closets.get(0).getId();

        //새로운 카테고리 정보 조회
        Category newCategory = categoryRepository.findById(itemUpdateDto.getCategoryId())
            .orElseThrow(CategoryNotFoundException::new);

        List<ItemCategory> categories = new ArrayList<>();

        log.info("clothesId" + itemUpdateDto.getClothesId());
        log.info("categoryId" + itemUpdateDto.getCategoryId());

        //이전 ItemCategory 조회
        ItemCategory itemCategory = itemCategoryRepository.findByItemIdAndCategoryId(
            itemUpdateDto.getClothesId(), itemUpdateDto.getCategoryId()).orElseThrow(ItemCategoryNotFoundException::new);

        //신규 카테고리로 변경
        itemCategory.updateCategory(newCategory);

        categories.add(itemCategory);

        //아이템 정보 최신화
        item.updateItem(itemUpdateDto, categories, itemImages);

        return item;
    }

    @Override
    public void deleteItem(Long clothesId) {
        //아이템 가져오기
        Item item = itemRepository.findById(clothesId).orElseThrow(ClothesFindException::new);
        //옷사진 삭제하기
        for (ItemImage itemImage : item.getItemImages()) {
            amazonS3Util.deleteFile(itemImage.getItemImagePath());
            itemImageRepository.delete(itemImage);
        }

        itemCategoryRepository.delete(item.getItemCategories().get(0));

        //옷 삭제하기
        itemRepository.delete(item);
    }

    @Override
    public ItemResponseDto selectItem(Long clothesId) {
        //아이템 불러오기
        Item item = itemRepository.findById(clothesId).orElseThrow(ClothesFindException::new);
        //이미지 URL가져오기
        String frontImg = null;
        String backImg = null;

        List<ItemImage> itemImages = item.getItemImages();
        if (itemImages.size() == 2) {
            frontImg = itemImages.get(0).getItemImagePath();
            backImg = itemImages.get(1).getItemImagePath();
        } else {
            frontImg = itemImages.get(0).getItemImagePath();
        }
        //카테고리 가져오기
        //return
        return ItemResponseDto
            .builder()
            .clothesId(item.getId())
            .gender(item.getSex())
            .size(item.getSize())
            .purchase(item.getPurchase())
            .publicStatus(item.getPublicStatus())
            .salesStatus(item.getSalesStatus())
            .category(item.getItemCategories().get(0).getCategory().getName())
            .categoryId(item.getItemCategories().get(0).getCategory().getId())
            .frontImg(frontImg)
            .backImg(backImg)
            .brand(item.getBrand())
            .color(item.getColor())
            .bookmarkStatus(item.getBookmarkStatus())
            .build();
    }

    @Override
    public List<ItemListResponseDto> selectItemList(Long memberId) {
        List<Item> itemLists = itemRepository.findByMemberId(memberId);
        List<ItemListResponseDto> itemListResponseDtos = new ArrayList<>();
        for (Item itemList : itemLists) {
            String[] urls = new String[itemList.getItemImages().size()];
            for (int i = 0; i < itemList.getItemImages().size(); i++) {
                urls[i] = itemList.getItemImages().get(i).getItemImagePath();
            }
            itemListResponseDtos.add(
                ItemListResponseDto
                    .builder()
                    .bookmarkStatus(itemList.getBookmarkStatus())
                    .clothesId(itemList.getId())
                    .img(urls)
                    .build());
        }
        return itemListResponseDtos;
    }

    @Override
    public Long bookmarkClothes(Long clothesId) {
        Item item = itemRepository.findById(clothesId).orElseThrow(ClothesFindException::new);
        item.updateBookmark(BookmarkStatus.BOOKMARKING);
        return clothesId;
    }

    @Override
    public Long unbookmarkClothes(Long clothesId) {
        Item item = itemRepository.findById(clothesId).orElseThrow(ClothesFindException::new);
        item.updateBookmark(BookmarkStatus.NOT_BOOKMARKING);
        return clothesId;
    }

    @Override
    public List<ItemCategoryResponseDto> selectByCategory(Long categoryId, Long userId,
        Long closetId) {
        List<ItemCategory> items = itemCategoryRepository.findByMemberIdAndCategoryId(userId,
            categoryId);

        List<ItemCategoryResponseDto> itemCategoryResponseDtos = new ArrayList<>();
        for (ItemCategory item : items) {
            if (item.getCategory().getCloset().getId() != closetId) {
                continue;
            }
            String[] imgUrls = new String[item.getItem().getItemImages().size()];
            for (int i = 0; i < item.getItem().getItemImages().size(); i++) {
                imgUrls[i] = item.getItem().getItemImages().get(i).getItemImagePath();
            }
            itemCategoryResponseDtos.add(
                ItemCategoryResponseDto
                    .builder()
                    .bookmarkStatus(item.getItem().getBookmarkStatus())
                    .clothesId(item.getId())
                    .img(imgUrls)
                    .build());
        }
        return itemCategoryResponseDtos;
    }

    @Override
    public List<ItemCategoryResponseDto> selectByBookmark(Long memberId) {
        List<Item> items = itemRepository.findByMemberIdAndBookmarkStatus(
            memberId, BookmarkStatus.BOOKMARKING);

        List<ItemCategoryResponseDto> itemCategoryResponseDtos = new ArrayList<>();
        for (Item item : items) {
            String[] imgs = new String[item.getItemImages().size()];
            for (int i = 0; i < item.getItemImages().size(); i++) {
                imgs[i] = item.getItemImages().get(i).getItemImagePath();
            }
            itemCategoryResponseDtos.add(ItemCategoryResponseDto
                .builder()
                .bookmarkStatus(item.getBookmarkStatus())
                .clothesId(item.getId())
                .img(imgs)
                .build()
            );
        }
        return itemCategoryResponseDtos;
    }

    @Override
    public List<ItemListResponseDto> selectByRtcList(Long memberId) {
        // memberId의 공개된 옷들 전부 가져오기
        List<Item> findItems = itemRepository.findByMemberIdAndPublicStatus(
            memberId, PublicStatus.PUBLIC);

        List<ItemListResponseDto> itemListResponseDtos = new ArrayList<>();

        for (Item findItem : findItems) {
            //이미지 URL 저장
            String[] urls = new String[findItem.getItemImages().size()];
            for (int i = 0; i < findItem.getItemImages().size(); i++) {
                urls[i] = findItem.getItemImages().get(i).getItemImagePath();
            }
            itemListResponseDtos.add(ItemListResponseDto
                .builder()
                .img(urls)
                .clothesId(findItem.getId())
                .bookmarkStatus(findItem.getBookmarkStatus())
                .build()
            );
        }
        return itemListResponseDtos;
    }

    @Override
    public List<ItemCategoryResponseDto> selectByRtcCategoryList(Long memberId, Long categoryId,
        Long closetId) {
        // memberId가 갖고있는 공개된 categoryId의 옷을 가져옴
        List<ItemCategory> findItemCategories = itemCategoryRepository.findByMemberIdAndCategoryIdAndPublicStatus(
            memberId, categoryId,
            PublicStatus.PUBLIC);

        List<ItemCategoryResponseDto> itemCategoryResponseDtos = new ArrayList<>();

        for (ItemCategory findItemCategory : findItemCategories) {
            if (findItemCategory.getCategory().getCloset().getId() != closetId) {
                continue;
            }

            String[] urls = new String[findItemCategory.getItem().getItemImages().size()];
            for (int i = 0; i < findItemCategory.getItem().getItemImages().size(); i++) {
                urls[i] = findItemCategory.getItem().getItemImages().get(i).getItemImagePath();
            }

            itemCategoryResponseDtos.add(ItemCategoryResponseDto
                .builder()
                .img(urls)
                .clothesId(findItemCategory.getItem().getId())
                .bookmarkStatus(findItemCategory.getItem().getBookmarkStatus())
                .build());
        }

        return itemCategoryResponseDtos;
    }
}
