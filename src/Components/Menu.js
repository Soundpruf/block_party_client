// const site_routes = [
//     {
//         path: '/',
//         name: 'Home'
//     },
//     {
//         path: '/users/dashboard/:user_id',
//         name: 'Dashboard'
//     },
//     {
//         path: '/listen',
//         name: 'Listen'
//     }
// ]
// const menu_items = site_routes.map((route) => (<Menu.Item className=''><Link to={`${route.path}`}>{route.name}</Link></Menu.Item>))

// const FixedMenu = () => (
//     <Menu fixed='top' size='large' id="fixedNav">
//         <Container>
//             {menu_items}
//             <Menu.Menu position='right'>
//                 <Menu.Item className='item'>
//                     <Link to='/login'>Login</Link>
//                 </Menu.Item>
//                 <Menu.Item>
//                     <Link to='/signup'>Sign up</Link>
//                 </Menu.Item>
//             </Menu.Menu>
//         </Container>
//     </Menu>
// )