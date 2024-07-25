package ssafy.c205.ott.domain.lookbook.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.c205.ott.domain.lookbook.service.TagService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/tag")
public class TagController {
    private final TagService tagService;

    @PostMapping("/{name}")
    public ResponseEntity<?> addTag(@PathVariable String name) {
        return null;
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> getTag(@PathVariable String name) {
        return null;
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteTag(@PathVariable String name) {
        return null;
    }
}
