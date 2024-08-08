package ssafy.c205.ott.domain.recommend.service;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class User {

    private float height;
    private float weight;
    private Long memberId;

    public User() {
    }

    @Builder
    public User(float height, float weight, Long memberId) {
        this.height = height;
        this.weight = weight;
        this.memberId = memberId;
    }

    public double distance(User user) {
        return Math.sqrt(Math.pow((user.getHeight() - this.height), 2) + Math.pow(
            (user.getWeight() - this.weight), 2));
    }

    public void update(float height, float weight) {
        this.height = height;
        this.weight = weight;
    }
}
