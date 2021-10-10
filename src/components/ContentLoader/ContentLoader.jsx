import BounceLoader from "react-spinners/BounceLoader";

const ContentLoader = () => {
    return (
        <div className="content-loader">
          <BounceLoader color="green" loading={true} size={100} />  
        </div>
    )
}

export default ContentLoader
