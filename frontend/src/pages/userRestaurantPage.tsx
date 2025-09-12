import UserHeader from '../components/commonComponents/userHeader';
import Restaurant from '../components/restaurant/restaurant';

const userRestaurant = () => {
    return (
        <div>
            <UserHeader />
            <div className="pt-16"> 
                <Restaurant />
            </div>
        </div>
    )
}

export default userRestaurant
