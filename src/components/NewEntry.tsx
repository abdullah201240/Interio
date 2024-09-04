import React from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import AdminFooter from './AdminFooter';
import AdminNewEntry from './AdminNewEntry';

export default function NewEntry() {
    return (
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100vh', background: 'rgb(243, 242, 247)' }}>
            <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 1000 }}>
                <AdminNavbar />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '16px', padding: '16px' }}>
                <Sidebar />
                <div style={{ flex: 1, marginLeft: '20%', maxWidth: '1200px', width: '100%' }}>


                    <AdminNewEntry />

                   



                </div>
                
            </div>

           

            <footer>
                <AdminFooter />
            </footer>
        </div>
    );
}
