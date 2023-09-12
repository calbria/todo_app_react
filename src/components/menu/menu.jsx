/* eslint-disable react/prop-types */
import './menu.scss';


export default function Menu({tasks, activeItem, setActiveItem, clearHandler}) {
   
    return (
        <div className='menu'>
            <p className='menu__counter'>{`${tasks.length} tasks left`}</p>
              <ul className='menu__filter'>
              <li className={`menu__filter-item ${activeItem === 'All' ? 'active' : ''} `} onClick={(e) => setActiveItem(e.target.innerText)}>All</li>
              <li className={`menu__filter-item ${activeItem === 'Active' ? 'active' : ''} `} onClick={(e) => setActiveItem(e.target.innerText)}>Active</li>
              <li className={`menu__filter-item ${activeItem === 'Completed' ? 'active' : ''} `} onClick={(e) => setActiveItem(e.target.innerText)}>Completed</li>
              </ul>
              <p className='menu__clear' onClick={clearHandler}>Clear completed</p>
        </div>
    )
}