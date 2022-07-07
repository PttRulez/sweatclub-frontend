
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader = () => {
	return (
    <div className='text-center mt-12'>
		<Skeleton count={5} width={'80%'} height={'50px'} highlightColor={'rgb(251 146 60)'}/>
    </div>
	)
}

export default SkeletonLoader
