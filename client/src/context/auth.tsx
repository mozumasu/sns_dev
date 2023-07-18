import React, { ReactNode, useContext } from 'react';

interface AuthContextType {
  //引数は返さないのでvoid型
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

//プロバイダー
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = async (token: string) => {
    //ローカルストレージにトークンをセット
    localStorage.setItem('auth_token', token);
  };

  //APIを叩く必要がないため非同期処理は無し
  const logout = () => {
    localStorage.removeItem('auth_token');
  };

  //返り値にloginとlogoutを指定できるようにvalueにまとめる
  const value = {
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
