import './ImageGallery.module.css';
import  {  useState, useEffect, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import ImageGalleryItems from 'components/ImageGalleryItems/ImageGalleryItems';
import getPics from 'components/api-service(only-get)/api-service';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function ImageGalleryy({searchTarget}) {
    const [responseWithPics,setResponseWithPics] = useState([]);
    const [status, setStatus] = useState(Status.IDLE);
    const [loadMore, setLoadMore] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [toggleModal, setToggleModal] = useState(false);
    const [highQualityPic, setHighQualityPic] = useState(null);
    

    useEffect(() => {
        const exitFromBigPic = e => { if (e.key === 'Escape') { setToggleModal(false) }; }
        document.addEventListener('keydown', exitFromBigPic);
        return () => document.removeEventListener('keydown', exitFromBigPic);
    }, []);
    const previousFooRef = useRef(searchTarget);

    useEffect(() => {
        if (!searchTarget) {
            return;
        };
        if (previousFooRef.current !== searchTarget) {
            resetForm();
            setStatus(Status.PENDING);
            setLoadMore(false);
            takePics(1);
        }
        else {
            takePics();
        };
    },[searchTarget]);


    const takePics = (curPage) => {
        try {
            setTimeout(async() => {
                const { data } = await getPics.fetchPics(searchTarget, curPage);
                previousFooRef.current !== searchTarget ? setResponseWithPics([...data.hits]) : setResponseWithPics([...responseWithPics, ...data.hits]);
                setStatus(Status.RESOLVED);
                previousFooRef.current = searchTarget;
                if (data.totalHits > 12) {setLoadMore(true)};
            }, 1000);
        } 
        catch (error) {
            setError(error);
            setStatus(Status.REJECTED);
            };
    };

    const clickOnMore = () => {
        setCurrentPage(currentPage + 1); 
        setStatus(Status.PENDING);
        setLoadMore(false);
        takePics(currentPage+1);
    };

    const clickOnPic = (highQualityPic) => {
        setToggleModal(!toggleModal);
        setHighQualityPic(highQualityPic);
    };

    const resetForm = () => {
        setResponseWithPics([]);
        setStatus(Status.IDLE);
        setLoadMore(false);
        setError(null);
        setCurrentPage(1);
    };

     return (
            <div>
                <ImageGalleryItems responseWithPics={responseWithPics} onClick={clickOnPic}/>
        
                {loadMore && <Button onClick={clickOnMore} />}
                {(status === 'pending') && (<Spinner animation="grow" />)}
                {(status === 'rejected') && (<Alert  variant={'danger'}>Something went wrong</Alert>)}
                {toggleModal && <Modal highQualityPic={ highQualityPic } onClick={setToggleModal}/>} 
            </div>);


};
// class ImageGallery extends Component {
//     state = {
//         responseWithPics: [],
//         status: Status.IDLE,
//         loadMore: false,
//         error: null,
//         currentPage: 1,
//         toggleModal: false,
//         highQualityPic:null,
//     };

//     componentDidMount() {
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape') {
//                 this.setState({ toggleModal:false });
//             };
//         });
        
//     };
//     componentWillUnmount() {
//         window.removeEventListener('keydown', (e) => {
//             if (e.key === 'Escape') {
//                 this.setState({ toggleModal:false });
//             };
//         });
//   }

    
//     componentDidUpdate(prevProps, prevState) {
//         const prevSearchTarget = prevProps.searchTarget;
//         const nextSearchTarget = this.props.searchTarget;

//          if (prevSearchTarget !== nextSearchTarget) {
//             this.resetForm(); 
//             this.setState({ status: Status.PENDING, loadMore: false });
//             setTimeout(() => {
//                 this.takePics();
//         }, 1000);
//         };
//     };

//     async takePics ()  {
//         const { currentPage } = this.state;
//         const { searchTarget } = this.props;
        
    
//         try {
//             const { data } = await getPics.fetchPics(searchTarget, currentPage);
//             this.setState(prevState=>
//                 ({
//                     responseWithPics: [...prevState.responseWithPics, ...data.hits],
//                     status: Status.RESOLVED,
//                     currentPage: prevState.currentPage + 1 
//                 }));
//             if (data.totalHits > 12) {
//                     this.setState({ loadMore: true });
//                 };
//         }
//         catch (error) {
//                 this.setState({ error:error, status: Status.REJECTED });
//             };
//     };
    
//     clickOnMore = () => {
//         this.setState({ status: Status.PENDING, loadMore: false });
//         setTimeout(() => {
//                 this.takePics();
//         }, 1000);
//     };

//     clickOnPic = (highQualityPic) => {
//         console.log(highQualityPic);
//         this.setState({ toggleModal: !this.state.toggleModal,highQualityPic:highQualityPic });
//     }

//     toggleModal = () => {
//         this.setState({ toggleModal: !this.state.toggleModal });
//             console.log(123);
//     }

//     resetForm() {
//         this.setState({
//             responseWithPics: [],
//             status: Status.IDLE,
//             loadMore: false,
//             error: null,
//             currentPage: 1,
//         });
//     };

    
//     render() {
//         const { loadMore, responseWithPics, status,toggleModal,highQualityPic } = this.state;
//         // console.log(responseWithPics);

//             return (
//                 <div>
//                     <ImageGalleryItems responseWithPics={responseWithPics} onClick={this.clickOnPic}/>
                    
//                     {loadMore && <Button onClick={this.clickOnMore} />}
//                     {(status === 'pending') && (<Spinner animation="grow" />)}
//                     {(status === 'rejected') && (<Alert  variant={'danger'}>Something went wrong</Alert>)}
//                     {toggleModal && <Modal highQualityPic={ highQualityPic } onClick={this.toggleModal}/>} 
//             </div>);
        


        
//     };
// };

export default ImageGalleryy;