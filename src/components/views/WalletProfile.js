import { Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { AiOutlineQrcode, AiTwotoneContainer, AiOutlineKey, AiOutlineUser } from 'react-icons/ai';
import WalletResetPasswordModal from "../component/WalletResetPasswordModal";
import { useTranslation } from 'react-i18next';

function WalletProfile() {
  const [t, i18n] = useTranslation();
  const [use, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [showModal, setShowModal] = useState(false);
  const [ethPrice, setEthPrice] = useState(null);
  const [metaAccount, setMetaAccount] = useState(null);

  const getEthPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      setEthPrice(data.ethereum.usd);
    } catch (error) {
      console.error('Error fetching ETH price:', error);
    }
  }

  async function btnhandler () {
		if (window.ethereum) {
			await window.ethereum
				.request({ method: "eth_requestAccounts" })
				.then((res) => {
          console.log('...............................'+res[0]);
          setMetaAccount(res[0])
        });
		} else {
			alert("install metamask extension!!");
		}
	}

  useEffect(() => {
    getEthPrice();

    const interval = setInterval(() => {
      getEthPrice();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Col span={22} offset={1} className="mt-8 myColor1 text-sm">
      <Row>
        <Col span={20}>
          {t('Email Address')}
        </Col>
        <Col span={4} className="text-center text-overflow">
          {t('Edit Password')}
        </Col>
      </Row>

      <Row className="text-lg font-bold">
        <Col span={20}>
          {t(use.email)}
        </Col>
        <Col span={4} className="text-center">
          <a onClick={() => setShowModal(true)}><AiOutlineKey size={20} className="inline mr-2" /></a>
        </Col>
      </Row>

      {ethPrice !== null &&
        <Row>
          <Col span={20}>
            Ethereum Price
          </Col>
          <Col span={4} className="text-center">
            ${ethPrice}
          </Col>
        </Row>
      }
      <Row>
        {!metaAccount && (
          <Col span={20}>
            <button className="myButton myBule text-white px-3 xl:px-6" onClick={btnhandler}> Connect Metamask </button>
          </Col>
        )}
        <Col span={4} className="text-center">
          {metaAccount ? `$${metaAccount}` : 'Not connected'}
        </Col>
      </Row>


      {
        showModal ?
          <WalletResetPasswordModal setModalShow={setShowModal} title="Reset Password" />
          : null
      }
    </Col>
  );
}

export default WalletProfile;
