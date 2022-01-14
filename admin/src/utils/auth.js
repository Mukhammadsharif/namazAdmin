import isEmpty from 'lodash/isEmpty'

export function auth() {
    if (isEmpty(localStorage.token)) {
        return {}
    }

    return {
        headers: {
            Authorization: `Token ${localStorage.token}`,
        },
    }
}

let permissions

export function checkPermission(permission) {
    if (!permissions) {
        permissions = JSON.parse(localStorage.getItem('permissions'))
    }

    return permissions.includes(permission)
}

export function clearPermissions() {
    permissions = undefined
}

export function redirectPage(groups) {
    // eslint-disable-next-line no-restricted-syntax
    for (const group of groups) {
        if (group === 'admin') return '/statistics/finance'
        if (group === 'seller') return '/project/projects'
        if (group === 'developer' || group === 'team_lead') return '/task/projects'
        if (group === 'accountant') return '/finance/wallet'
        if (group === 'hr') return '/staff/employee'
    }
    return '/task/projects'
}

export function signin({ user, token, permissions: userPermissions }, navigation) {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('permissions', JSON.stringify(userPermissions))
    navigation()
}

export function signOut(history) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('permissions')
    clearPermissions()
    history.push('/')
}

export function isAuthenticated() {
    return localStorage.getItem('user')
        && localStorage.getItem('token')
        && localStorage.getItem('permissions')
}
