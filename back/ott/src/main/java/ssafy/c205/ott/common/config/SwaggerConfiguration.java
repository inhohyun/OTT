package ssafy.c205.ott.common.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI openAPI() {
        Info info = new Info().title("OTT API 명세서").description(
            "<h3>OTT API Reference for Developers</h3> 공통 프로젝트 OTT API <br>"
        ).version("v1").contact(new io.swagger.v3.oas.models.info.Contact().name(
                "최승현, \t\n" + "장재훈, \t\n" + "박지응, \t\n" + "인호현, \t\n" + "전가현, \t\n" + "최승필")
            .email("csh7099@naver.com"));

        return new OpenAPI().components(new Components()).info(info);
    }

    @Bean
    public GroupedOpenApi allApi() {
        return GroupedOpenApi.builder().group("OTT-ALL").pathsToMatch("/**").build();
    }

    @Bean
    public GroupedOpenApi lookbookApi() {
        return GroupedOpenApi.builder().group("OTT-LOOKBOOK").pathsToMatch("/api/lookbook/**")
            .build();
    }

    @Bean
    public GroupedOpenApi tagApi() {
        return GroupedOpenApi.builder().group("OTT-Tag").pathsToMatch("/api/tag/**").build();
    }

    @Bean
    public GroupedOpenApi commentApi() {
        return GroupedOpenApi.builder().group("OTT-Comment").pathsToMatch("/api/comment/**").build();
    }

    @Bean
    public GroupedOpenApi memberApi() {
        return GroupedOpenApi.builder().group("OTT-Member").pathsToMatch("/members/**").build();
    }

    @Bean
    public GroupedOpenApi clothesApi() {
        return GroupedOpenApi.builder().group("OTT-Clothes").pathsToMatch("/api/clothes/**").build();
    }

    @Bean
    public GroupedOpenApi categoryApi() {
        return GroupedOpenApi.builder().group("OTT-Category").pathsToMatch("/api/category/**").build();
    }

    @Bean
    public GroupedOpenApi closetApi(){
        return GroupedOpenApi.builder().group("OTT-Closet").pathsToMatch("/api/closet/**").build();
    }

    @Bean
    public GroupedOpenApi AiApi(){
        return GroupedOpenApi.builder().group("OTT-AI").pathsToMatch("/api/process/**").build();
    }

    @Bean
    public GroupedOpenApi RecommendApi(){
        return GroupedOpenApi.builder().group("OTT-Recommend").pathsToMatch("/api/recommend/**").build();
    }
}
