import '../../../assets/css/dashboardContent.css';
import Header from './Header';
import RecentCourses from './RecentCourses';
function DashboardContent(){
    return(
        <div className="dashboardContent">
            <Header/>
            <RecentCourses/>

        </div>
    )
}
export default DashboardContent;