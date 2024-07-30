package ssafy.c205.ott.domain.closet.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.account.entity.Member;
import ssafy.c205.ott.domain.closet.dto.ClosetDto;
import ssafy.c205.ott.domain.closet.entity.Closet;
import ssafy.c205.ott.domain.closet.repository.ClosetRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClosetService {
    private final ClosetRepository closetRepository;

    public List<ClosetDto> findByMemberId(Long memberId) {
        List<Closet> closets = closetRepository.findByMemberId(memberId);
        return closets.stream()
                .map(closet -> ClosetDto.builder().id(closet.getId()).build())
                .collect(Collectors.toList());
    }

    public Closet createClosetForMember(Member member) {
        Closet closet = new Closet(member);
        return closetRepository.save(closet);
    }
}
