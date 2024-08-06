package ssafy.c205.ott.domain.item.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ssafy.c205.ott.common.util.AmazonS3Util;
import ssafy.c205.ott.domain.account.entity.ActiveStatus;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.account.repository.MemberRepository;
import ssafy.c205.ott.domain.item.dto.requestdto.ItemCreateDto;
import ssafy.c205.ott.domain.item.dto.requestdto.ItemUpdateDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemListResponseDto;
import ssafy.c205.ott.domain.item.dto.responsedto.ItemResponseDto;
import ssafy.c205.ott.domain.item.entity.BookmarkStatus;
import ssafy.c205.ott.domain.item.entity.Item;
import ssafy.c205.ott.domain.item.entity.ItemImage;
import ssafy.c205.ott.domain.item.entity.ItemStatus;
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

    @Override
    public void createItem(ItemCreateDto itemCreateDto, MultipartFile frontImg,
        MultipartFile backImg) {
        log.info("dto : {}", itemCreateDto.toString());
        log.info("frontImg : {}", frontImg);
        log.info("backImg : {}", backImg);
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
        //Todo : Category 추가
        itemRepository.save(Item
            .builder()
            .id(saveItem.getId())
            .color(itemCreateDto.getColor())
            .sex(itemCreateDto.getGender())
            .brand(itemCreateDto.getBrand())
            .member(member)
            .itemImages(itemImages)
            .size(itemCreateDto.getSize())
            .purchase(itemCreateDto.getPurchase())
            .publicStatus(itemCreateDto.getPublicStatus())
            .salesStatus(itemCreateDto.getSalesStatus())
            .bookmarkStatus(BookmarkStatus.NOT_BOOKMARKING)
            .build());
    }

    @Override
    public void updateItem(Long clothesId, ItemUpdateDto itemUpdateDto, MultipartFile frontImg,
        MultipartFile backImg) {
        log.info("dto : {}", itemUpdateDto.toString());
        log.info("frontImg : {}", frontImg);
        log.info("backImg : {}", backImg);
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

            //Todo : 카테고리 변경
            //카테고리 변경
            //1. 기존 카테고리 삭제

            //2. 신규 카테고리 생성

            Optional<Member> om = memberRepository.findByIdAndActiveStatus(item.getMember().getId(),
                ActiveStatus.ACTIVE);
            if (om.isPresent()) {
                Member member = om.get();
                //Todo : Category 추가
                itemRepository.save(Item
                    .builder()
                    .id(item.getId())
                    .sex(itemUpdateDto.getGender())
                    .brand(itemUpdateDto.getBrand())
                    .member(member)
                    .itemImages(itemImages)
                    .size(itemUpdateDto.getSize())
                    .purchase(itemUpdateDto.getPurchase())
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
            //todo: 카테고리삭제
            //카테고리 삭제

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
            //Todo : 카테고리 return 넣을것
            return ItemResponseDto
                .builder()
                .clothesId(item.getId())
                .gender(item.getSex())
                .size(item.getSize())
                .purchase(item.getPurchase())
                .publicStatus(item.getPublicStatus())
                .salesStatus(item.getSalesStatus())
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
}
