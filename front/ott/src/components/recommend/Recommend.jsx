import Lookbook from '../lookbook/Lookbook';
import './Recommend.css'

const Recommend = () =>{
    return (
        <div className="Recommend">
            <div className="cm_kg_section"><p>#키·몸무게</p>
                <Lookbook />
            </div>
            <div className="type"><p>#체형</p></div>
            <div className="style"><p>#선호 스타일</p></div>
        </div>
    );
};

export default Recommend;

