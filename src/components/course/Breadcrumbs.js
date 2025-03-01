import '../../App.css';

function Breadcrumps({category, courseName}) {
  return (
    <div className="Breadcrumbs-Container">
      <text className='Text-Light'>{category}</text>
      <text className='Text-Light'> - </text>
      <text className='Text-Light'>{courseName}</text>
    </div>
  );
}

export default Breadcrumps;