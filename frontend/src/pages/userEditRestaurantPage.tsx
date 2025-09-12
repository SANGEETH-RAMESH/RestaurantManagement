import UserHeader from '../components/commonComponents/userHeader';
import UserEditRestaurantBody from '../components/restaurant/editRestaurant';

const userEditRestuarantPage = () => {
  return (
    <div>
            <UserHeader />
            <div className="pt-16"> 
                <UserEditRestaurantBody />
            </div>
        </div>
  )
}

export default userEditRestuarantPage
