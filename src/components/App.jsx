import './App.css';
import  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Container from './Container/Cotainer';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';





function App() {
  const [searchTarget, setSearchTarget] = useState('');

  return (
    <Container>
      <Searchbar onSubmit={setSearchTarget} />
      <ImageGallery searchTarget={searchTarget} />
    </Container>
  );
};

// class App extends Component  {
//   state = {
//     searchTarget: '',
//   };
  
// handleFormSubmit = searchTarget => {
//     this.setState({ searchTarget })
//   };

 

//   render() {
//     const { searchTarget } = this.state;

//     return (
//       <Container>
        
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery searchTarget={searchTarget} />
        
//       </Container>

//     )
//   }
// };

export default App;