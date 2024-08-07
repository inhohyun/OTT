package ssafy.c205.ott.domain.item.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.common.entity.BaseEntity;
import ssafy.c205.ott.common.entity.ItemCategory;
import ssafy.c205.ott.common.entity.PublicStatus;
import ssafy.c205.ott.domain.account.entity.Member;

@Entity
@Getter
public class Item extends BaseEntity {
    // Todo: 이미지 테이블 추가
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String size;
    private String brand;
    private String purchase;

    @Enumerated(EnumType.STRING)
    private PublicStatus publicStatus = PublicStatus.PRIVATE;
    private String color;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY)
    private List<ItemCategory> itemCategories = new ArrayList<>();

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY)
    private List<ItemImage> itemImages = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private BookmarkStatus bookmarkStatus = BookmarkStatus.NOT_BOOKMARKING;

    @Enumerated(EnumType.STRING)
    private SalesStatus salesStatus = SalesStatus.NOT_SALE;

    @Builder
    public Item(Long id, String size, String brand, String purchase, PublicStatus publicStatus, String color, Sex sex, List<ItemCategory> itemCategories, Member member, List<ItemImage> itemImages, BookmarkStatus bookmarkStatus, SalesStatus salesStatus) {
        this.id = id;
        this.size = size;
        this.brand = brand;
        this.purchase = purchase;
        this.publicStatus = publicStatus;
        this.color = color;
        this.sex = sex;
        this.itemCategories = itemCategories;
        this.member = member;
        this.itemImages = itemImages;
        this.bookmarkStatus = bookmarkStatus;
        this.salesStatus = salesStatus;
    }

    public Item() {
    }
}
