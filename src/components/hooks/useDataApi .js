import {  useState, useEffect, } from 'react';
import getPics from 'components/api-service(only-get)/api-service';


const  useDataApi = () => {
  const [dataOnPages, setDataOnPages] = useState([]);
  const [target, setTargeta] = useState('');
  const [curPage, setCurPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
    



    useEffect(() => {
         if (!target) {
            return;
        };

        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            setLoadMore(false);
          await setTimeout(async() => {
             try {
               const { data } = await getPics.fetchPics(target, curPage);
 
                 setDataOnPages(prevData=>[ ...prevData, ...data.hits]);
                 if (data.totalHits > 12) { setLoadMore(true) };
             }
             catch (error) {setIsError(true);};
 
             setIsLoading(false);
           }, 1000);
        };

        fetchData();

  }, [curPage, target]);

  return [{ dataOnPages, isLoading, isError,loadMore,curPage }, setTargeta, setCurPage,setDataOnPages, setLoadMore];
};

export default useDataApi;