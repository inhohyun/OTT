import './SurveyFormModal.css';

export default function SurveyFormModal({ show, children }) {
	if (!show) {
		return null;
	}	

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				{children}
			</div>
		</div>
	);
};