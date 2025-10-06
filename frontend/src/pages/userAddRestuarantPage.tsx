import UserHeader from '../components/commonComponents/userHeader';
import UserAddRestaurantBody from '../components/restaurant/addRestaurant'

const userAddRestuarantPage = () => {
  return (
    <div>
            <UserHeader />
            <div className="pt-16"> 
                <UserAddRestaurantBody />
            </div>
        </div>
  )
}

export default userAddRestuarantPage
