import axiosInstance from '../axiosInstance';

// 유저 페이지에서 사용자 정보를 불러옴
export const getUserInfo = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/members/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// 사용자 정보를 업데이트함
export const updateUserInfo = async (memberId, MemberUpdateRequestDto) => {
  try {
    const response = await axiosInstance.put(
      `/api/members/${memberId}`,
      MemberUpdateRequestDto
    );
    return response;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};

// uid를 가져오는 api
export const getUid = async () => {
  try {
    const response = await axiosInstance.get('/api/members/my');
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// 팔로잉 수 조회 api
export const getFollowingCount = async (memberId) => {
  try {
    const response = await axiosInstance.get(
      `api/members/${memberId}/followingsCount`
    );
    console.log('팔로우수', response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 다른 사용자를 팔로우
export const followUser = async (targetId) => {
  try {
    const response = await axiosInstance.post(
      `/api/members/follow/${targetId}`
    );
    return response;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

// 다른 사용자 언팔로우
export const unfollowUser = async (targetId) => {
  try {
    const response = await axiosInstance.post(
      `/api/members/unfollow/${targetId}`
    );
    return response;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};

// 팔로우 요청 수락 api
export const followRequestAccept = async (requestId) => {
  try {
    const response = await axiosInstance.post(
      `api/members/follow/${requestId}/accept`
    );
    return response.data;
  } catch (error) {
    console.error('팔로우 요청 수락 중 에러 발생:', error);
    throw error;
  }
};

// 팔로우 요청 거절 api
export const followRequestReject = async (requestId) => {
  try {
    const response = await axiosInstance.post(
      `api/members/follow/${requestId}/reject`
    );
    return response.data;
  } catch (error) {
    console.error('팔로우 요청 거절 중 에러 발생:', error);
    throw error;
  }
};

// 유저 취향 태그 등록 api
export const addMemberTags = async (memberId, tags) => {
  try {
    const requestBody = {
      memberId: memberId,
      tag: tags,
    };

    const response = await axiosInstance.post(
      `api/members/${memberId}/memberTags`,
      requestBody
    );
    return response;
  } catch (error) {
    console.error('태그 추가 중 오류 발생', error);
    throw error;
  }
};

// 사용자의 룩북 개수 조회
export const getLookbookCount = async (memberId) => {
  try {
    const response = await axiosInstance.get(`api/lookbook/count`, {
      params: { memberId: memberId },
    });
    console.log('룩북개수', response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 유저 닉네임 검색
export const getUserListNickname = async (nickname) => {
  try {
    console.log(nickname);
    const endpoint = `api/members/more?nickname=${nickname}`;

    const response = await axiosInstance.get(endpoint);

    if (response && response.status === 200 && response.data) {
      const data = response.data.data;

      if (data) {
        const processedData = data.map((user) => ({
          id: user.id,
          name: user.name,
          nickname: user.nickname,
          profileImageUrl: user.profileImageUrl,
        }));
        console.log(processedData);

        return processedData;
      } else {
        throw new Error('Response data is empty');
      }
    } else {
      throw new Error(
        `Unexpected response structure or status: ${response.status}`
      );
    }
  } catch (error) {
    console.error('Error search user:', error);
    throw error;
  }
};

// 유저 페이지에서 사용자 정보를 불러옴
export const getUserNickname = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/members/${id}/nickname`);
    return response;
  } catch (error) {
    console.error('Error fetching user nickname:', error);
    throw error;
  }
};

// 설문조사 여부 확인 api
export const getSurveyCompleteStatus = async () => {
  try {
    const response = await axiosInstance.get('api/members/SurveyStatus');
    return response.data;
  } catch (error) {
    console.error('설문조사 상태 가져오는 중 에러 발생:', error);
    throw error;
  }
};
