import './Searchbar.module.css';
import { useState } from 'react';

function Searchbar({onSubmit}) {
  const [text, setText] = useState('');

  const handlSubmit = e => {
        e.preventDefault();
        onSubmit(text);
    };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handlSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          name="text"
          value={text}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setText(e.target.value)}
        />
      </form>
    </header>
  );
};

// class Searchbar extends Component  {
//     state = {
//         text: '',
//     };
    
//     handleChange = e => {
//         const { name, value } = e.target;
//         this.setState({[name]:value});
//     };


//     handlSubmit = e => {
//         e.preventDefault();
//         const { text } = this.state;
//         this.props.onSubmit(text);
//         // this.setState({ text: '' });
//     };

//     render() {
//         const { text } = this.state;

//         return (
//           <header className="searchbar">
//             <form className="form" onSubmit={this.handlSubmit}>
//               <button type="submit" className="button">
//               <span className="button-label">Search</span>
//               </button>
//               <input
//               className="input"
//               type="text"
//               name="text"
//               value={text}
//               autoComplete="off"
//               autoFocus
//               placeholder="Search images and photos"
//               onChange={this.handleChange}
//               />
//             </form>
//           </header>
                



//    )
//   }
// };

export default Searchbar;