import { useState } from 'react';

import './SurveyIng.css';
import SurveyFormModal from '../../components/modals/SurveyFormModal';

export default function SurveyIng() {
	const [isModalOpen, setModalOpen] = useState(true);

	const handleSubmit = function(e) {
		e.preventDefault()
		console.log('설문 제출 완료')
		setModalOpen(false)
	}

    return (
			<div className="survey-ing-container">
				<SurveyFormModal show={isModalOpen}>
					<h2>개인 정보</h2>
					<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">이름</label>
						<input type="text" id="name" placeholder="이쟈니" required />
					</div>
					<div className="form-group">
						<label htmlFor="phone">전화번호</label>
						<input type="text" id="phone" placeholder="-을 뺀 숫자만 입력하세요" required />
					</div>
					<div className="form-group">
						<label htmlFor="nickname">닉네임</label>
						<input type="text" id="nickname" placeholder="닉네임을 입력하세요" required />
					</div>
					<button type="submit">다음</button>
					</form>
				</SurveyFormModal>
			</div>
    )
}