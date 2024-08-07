package ssafy.c205.ott.domain.item.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.common.entity.ItemCategory;
import ssafy.c205.ott.common.util.AmazonS3Util;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.category.entity.Category;
import ssafy.c205.ott.domain.category.repository.CategoryRepository;
import ssafy.c205.ott.domain.closet.dto.ClosetDto;
import ssafy.c205.ott.domain.closet.repository.ClosetRepository;
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
    private final ClosetRepository closetRepository;
    private final ItemCategoryRepository itemCategoryRepository;

    @Override
    public void createItem(ItemCreateDto itemCreateDto, MultipartFile frontImg,
        MultipartFile backImg) {
        Optional<Member> om = memberRepository.findByIdAndActiveStatus(itemCreateDto.getUid(),
            ActiveStatus.ACTIVE);
        Member member = null;
        if (om.isPresent()) {
            member = om.get();
        }
        //빈 객체 생성
        Item saveItem = itemRepository.save(Item.builder().member(member).build());

        //이미지 저장
        List<String> urls = new ArrayList<>();
        if (frontImg != null) {
            urls.add(amazonS3Util.saveFile(frontImg));
        }
        if (backImg != null) {
            urls.add(amazonS3Util.saveFile(backImg));
        }
        List<ItemImage> itemImages = new ArrayList<>();
        int idx = 0;
        for (String url : urls) {
            ItemImage saveImage = itemImageRepository.save(ItemImage
                .builder()
                .itemStatus(idx++ == 0 ? ItemStatus.FRONT : ItemStatus.BACK)
                .itemImagePath(url)
                .item(saveItem)
                .build());

            itemImages.add(saveImage);
        }

        //옷 저장
        //closet id 가져오기
        List<ClosetDto> closets = closetService.findByMemberId(itemCreateDto.getUid());
        Long closetId = closets.get(0).getId();

        Optional<Category> oc = categoryRepository.findByNameAndClosetId(
            itemCreateDto.getCategory(), closetId);
        Category category = null;
        if (oc.isPresent()) {
            category = oc.get();
        }
        List<ItemCategory> categories = new ArrayList<>();

        //카테고리가 존재하면 해당 카테고리로 넣어줌
        if (category != null) {
            categories.add(ItemCategory
                .builder()
                .category(category)
                .item(saveItem)
                .build());
            itemCategoryRepository.save(
                ItemCategory
                    .builder()
                    .item(saveItem)
                    .category(category)
                    .build());
        } else {
            //카테고리를 추가한 후 해당 카테고리 추가
            Category saveCategory = categoryRepository.save(Category
                .builder()
                .name(itemCreateDto.getCategory())
                .closet(closetRepository.findById(closetId).get())
                .build());

            itemCategoryRepository.save(
                ItemCategory
                    .builder()
                    .item(saveItem)
                    .category(saveCategory)
                    .build());
            categories.add(ItemCategory
                .builder()
                .category(saveCategory)
                .item(saveItem)
                .build());
        }

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

                itemImages.set(0, ItemImage
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
            List<ClosetDto> closets = closetService.findByMemberId(itemUpdateDto.getUid());
            Long closetId = closets.get(0).getId();

            Optional<Category> oc = categoryRepository.findByNameAndClosetId(
                itemUpdateDto.getCategory(), closetId);
            Category category = null;
            if (oc.isPresent()) {
                category = oc.get();
            }
            List<ItemCategory> categories = new ArrayList<>();

            //카테고리가 존재하면 해당 카테고리로 넣어줌
            if (category != null) {
                categories.add(ItemCategory
                    .builder()
                    .category(category)
                    .item(item)
                    .build());
            } else {
                //카테고리를 추가한 후 해당 카테고리 추가
                Category saveCategory = categoryRepository.save(Category
                    .builder()
                    .name(itemUpdateDto.getCategory())
                    .closet(closetRepository.findById(closetId).get())
                    .build());

                categories.add(ItemCategory
                    .builder()
                    .category(saveCategory)
                    .item(item)
                    .build());
            }
            Optional<Member> om = memberRepository.findByIdAndActiveStatus(item.getMember().getId(),
                ActiveStatus.ACTIVE);
            if (om.isPresent()) {
                Member member = om.get();
                itemRepository.save(Item
                    .builder()
                    .id(item.getId())
                    .sex(itemUpdateDto.getGender())
                    .brand(itemUpdateDto.getBrand())
                    .member(member)
                    .itemImages(itemImages)
                    .size(itemUpdateDto.getSize())
                    .purchase(itemUpdateDto.getPurchase())
                    .itemCategories(categories)
                    .publicStatus(itemUpdateDto.getPublicStatus())
                    .salesStatus(itemUpdateDto.getSalesStatus())
                    .color(itemUpdateDto.getColor())
                    .build());
            }
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
            //카테고리 삭제
            categoryRepository.delete(item.getItemCategories().get(0).getCategory());

            //옷 삭제하기
            itemRepository.delete(item);
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
                .build();
        }

        return null;
    }

    @Override
    public List<ItemListResponseDto> selectItemList(Long uid) {
        List<Item> itemLists = itemRepository.findByMemberId(uid);
        List<ItemListResponseDto> itemListResponseDtos = new ArrayList<>();
        for (Item itemList : itemLists) {
            String[] urls = new String[itemList.getItemImages().size()];
            for (int i = 0; i < itemList.getItemImages().size(); i++) {
                urls[i] = itemList.getItemImages().get(i).getItemImagePath();
            }
            itemListResponseDtos.add(ItemListResponseDto
                .builder()
                .bookmarkStatus(itemList.getBookmarkStatus())
                .clothesId(itemList.getId())
                .img(urls)
                .build());
        }
        return itemListResponseDtos;
    }

    @Override
    public void bookmarkLookbook(Long clothesId) {
        Optional<Item> oi = itemRepository.findById(clothesId);
        if (oi.isPresent()) {
            Item item = oi.get();
            itemRepository.save(item
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
        }
    }

    @Override
    public void unbookmarkLookbook(Long clothesId) {
        Optional<Item> oi = itemRepository.findById(clothesId);
        if (oi.isPresent()) {
            Item item = oi.get();
            itemRepository.save(item
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
        }
    }

    @Override
    public List<ItemCategoryResponseDto> selectByCategory(Long categoryId, Long userId,
        Long closetId) {
        List<ItemCategory> items = itemCategoryRepository.findByMemberIdAndCategoryId(
            userId, categoryId);

        List<ItemCategoryResponseDto> itemCategoryResponseDtos = new ArrayList<>();
        for (ItemCategory item : items) {
            if (item.getCategory().getCloset().getId() != closetId) {
                continue;
            }
            String[] imgUrls = new String[item.getItem().getItemImages().size()];
            for (int i = 0; i < item.getItem().getItemImages().size(); i++) {
                imgUrls[i] = item.getItem().getItemImages().get(i).getItemImagePath();
            }
            itemCategoryResponseDtos.add(ItemCategoryResponseDto
                .builder()
                .bookmarkStatus(item.getItem().getBookmarkStatus())
                .clothId(item.getId())
                .img(imgUrls)
                .build());
        }
        return itemCategoryResponseDtos;
    }
}
