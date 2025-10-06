import UserHeader from '../components/commonComponents/userHeader'

import UserLanding from '../components/restaurant/landing'

const userLandingPage = () => {
  return (
    <div>
      <UserHeader />
            <div className="pt-16"> 
                <UserLanding />
            </div>
    </div>
  )
}

export default userLandingPage
