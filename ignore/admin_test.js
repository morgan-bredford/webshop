//import React from 'react';

const admin_test = () => {
    let admin = false
    const set_admin = a => admin = a
    const get_admin = () => admin

    return {
        set_admin,
        get_admin
    }
}

export default admin_test()