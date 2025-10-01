import Skeleton from "react-loading-skeleton";


export default function SkeletonShow(props){
    const skeletonLength=Array.from({length:props.length}).map((_,key)=>(
    <div className={`col-lg-2 col-md-6 col-12 ${props.classes}`}>
            <div className="mx-1">
              <Skeleton width={props.width} baseColor={props.baseColor} height={props.height}/>
            </div>

        </div>)
        );
    return skeletonLength;
}