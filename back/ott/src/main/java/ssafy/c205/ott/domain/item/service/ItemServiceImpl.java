package ssafy.c205.ott.domain.item.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import ssafy.c205.ott.common.entity.ItemCategory;
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
import ssafy.c205.ott.domain.item.repository.ItemCategoryRepository;
import ssafy.c205.ott.domain.item.repository.ItemImageRepository;
import ssafy.c205.ott.domain.item.repository.ItemRepository;

@Service
@Slf4j
@RequiredArgsConstructor
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "앞면 사진이 존재하지 않습니다.");
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
    public void updateItem(Long clothesId, ItemUpdateDto itemUpdateDto, MultipartFile frontImg,
        MultipartFile backImg) {
        //이전 정보 가져오기
        Optional<Item> oi = itemRepository.findById(clothesId);
        if (oi.isPresent()) {
            Item item = oi.get();
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

            Category category = categoryRepository.findById(itemUpdateDto.getCategoryId())
                    .orElseThrow(CategoryNotFoundException::new);

            List<ItemCategory> categories = new ArrayList<>();
            ItemCategory itemCategory = itemCategoryRepository.findByMemberIdAndCategoryId(
                itemUpdateDto.getMemberId(), itemUpdateDto.getCategoryId()).get(0);

            ItemCategory saveCategory = itemCategoryRepository.save(
                ItemCategory
                    .builder()
                    .id(itemCategory.getId())
                    .category(category)
                    .item(item)
                    .build());

            categories.add(saveCategory);
            Member member = memberRepository.findByIdAndActiveStatus(item.getMember().getId(),
                    ActiveStatus.ACTIVE).orElseThrow(MemberNotFoundException::new);

            itemRepository.save(Item
                .builder()
                .id(item.getId())
                .sex(itemUpdateDto.getGender())
                .brand(itemUpdateDto.getBrand())
                .member(member).itemImages(itemImages)
                .size(itemUpdateDto.getSize())
                .purchase(itemUpdateDto.getPurchase())
                .itemCategories(categories)
                .bookmarkStatus(item.getBookmarkStatus())
                .publicStatus(itemUpdateDto.getPublicStatus())
                .salesStatus(itemUpdateDto.getSalesStatus())
                .color(itemUpdateDto.getColor())
                .build());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 옷을 찾을 수 없습니다.");
        }
    }

    @Override
    public void deleteItem(Long clothesId) {
        //아이템 가져오기
        Optional<Item> oi = itemRepository.findById(clothesId);
        if (oi.isPresent()) {
            Item item = oi.get();
            //옷사진 삭제하기
            for (ItemImage itemImage : item.getItemImages()) {
                amazonS3Util.deleteFile(itemImage.getItemImagePath());
                itemImageRepository.delete(itemImage);
            }

            //옷 삭제하기
            itemRepository.delete(item);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 옷을 찾지 못했습니다.");
        }
    }

    @Override
    public ItemResponseDto selectItem(Long clothesId) {
        //아이템 불러오기
        Optional<Item> oi = itemRepository.findById(clothesId);
        if (oi.isPresent()) {
            Item item = oi.get();
            //이미지 URL가져오기
            String[] images = new String[item.getItemImages().size()];
            for (int i = 0; i < item.getItemImages().size(); i++) {
                images[i] = item.getItemImages().get(i).getItemImagePath();
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
                .brand(item.getBrand())
                .color(item.getColor())
                .imageUrls(images)
                .bookmarkStatus(item.getBookmarkStatus())
                .build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 옷을 찾지 못했습니다.");
        }
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
                ItemListResponseDto.builder().bookmarkStatus(itemList.getBookmarkStatus())
                    .clothesId(itemList.getId()).img(urls).build());
        }
        return itemListResponseDtos;
    }

    @Override
    public void bookmarkClothes(Long clothesId) {
        Optional<Item> oi = itemRepository.findById(clothesId);
        if (oi.isPresent()) {
            Item item = oi.get();
            itemRepository.save(
                Item
                    .builder()
                    .id(item.getId())
                    .color(item.getColor())
                    .sex(item.getSex())
                    .brand(item.getBrand())
                    .member(item.getMember())
                    .itemImages(item.getItemImages())
                    .size(item.getSize())
                    .purchase(item.getPurchase())
                    .publicStatus(item.getPublicStatus())
                    .bookmarkStatus(BookmarkStatus.BOOKMARKING)
                    .salesStatus(item.getSalesStatus())
                    .build());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "옷을 찾지 못했습니다.");
        }
    }

    @Override
    public void unbookmarkClothes(Long clothesId) {
        Optional<Item> oi = itemRepository.findById(clothesId);
        if (oi.isPresent()) {
            Item item = oi.get();
            itemRepository.save(
                Item
                    .builder()
                    .id(item.getId())
                    .color(item.getColor())
                    .sex(item.getSex())
                    .brand(item.getBrand())
                    .member(item.getMember())
                    .itemImages(item.getItemImages())
                    .size(item.getSize())
                    .purchase(item.getPurchase())
                    .publicStatus(item.getPublicStatus())
                    .bookmarkStatus(BookmarkStatus.NOT_BOOKMARKING)
                    .salesStatus(item.getSalesStatus())
                    .build());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "옷을 찾지 못했습니다.");
        }
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
                    .clothId(item.getId())
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
                .clothId(item.getId())
                .img(imgs)
                .build()
            );
        }
        return itemCategoryResponseDtos;
    }
}
