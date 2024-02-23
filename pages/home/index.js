import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import ModuleWiseLayout from "../../src/components/module-wise-layout";
import Router from "next/router";
import { setConfigData } from "../../src/redux/slices/configData";
import ZoneGuard from "../../src/components/route-guard/ZoneGuard";
// import { getServerSideProps } from "../index";
import SEO from "../../src/components/seo";

const Home = ({ configData, landingPageData }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (configData) {
      if (configData.length === 0) {
        Router.push("/404");
      } else if (configData?.maintenance_mode) {
        Router.push("/maintainance");
      } else {
        dispatch(setConfigData(configData));
      }
    } else {
    }
  }, [configData]);
  let language_direction = undefined;
  if (typeof window !== "undefined") {
    language_direction = localStorage.getItem("language-setting");
  }

  return (
    <>
      <CssBaseline />
    
      
      <MainLayout configData={configData} landingPageData={landingPageData}>
      {configData && <SEO
        title="Home"
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
        configData={configData}
      />}
        <ModuleWiseLayout configData={configData} />
      </MainLayout>
    </>
  );
};

export default Home;


Home.getLayout = (page) => <ZoneGuard>{page}</ZoneGuard>;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const language = req.cookies.languageSetting;

  const configRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        "X-localization": language,
        origin: process.env.NEXT_CLIENT_HOST_URL,
      },
    }
  );
  const config = async () => { configRes ?  await configRes.json() : 
    {
      "business_name": "JAYMA SHOP - GADE GUI",
      "logo": "2023-08-16-64dca5f543996.png",
      "address": "dakar sacre coeur",
      "phone": "781142121",
      "email": "yndiour@jayma.shop",
      "base_urls": {
        "item_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/product",
        "refund_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/refund",
        "customer_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/profile",
        "banner_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/banner",
        "category_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/category",
        "review_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/review",
        "notification_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/notification",
        "store_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/store",
        "vendor_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/vendor",
        "store_cover_photo_url": "https://apishop.jaymagadegui.sn/storage/app/public/store/cover",
        "delivery_man_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/delivery-man",
        "chat_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/conversation",
        "campaign_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/campaign",
        "business_logo_url": "https://apishop.jaymagadegui.sn/storage/app/public/business",
        "order_attachment_url": "https://apishop.jaymagadegui.sn/storage/app/public/order",
        "module_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/module",
        "parcel_category_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/parcel_category",
        "landing_page_image_url": "https://apishop.jaymagadegui.sn/public/assets/landing/image",
        "react_landing_page_images": "https://apishop.jaymagadegui.sn/storage/app/public/react_landing",
        "react_landing_page_feature_images": "https://apishop.jaymagadegui.sn/storage/app/public/react_landing/feature",
        "gateway_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/payment_modules/gateway_image"
      },
      "country": "SN",
      "default_location": {
        "lat": "14.71411227979673",
        "lng": "-17.463886356299373"
      },
      "currency_symbol": "CFA",
      "currency_symbol_direction": "right",
      "app_minimum_version_android": 0,
      "app_url_android": null,
      "app_url_ios": null,
      "app_minimum_version_ios": 0,
      "app_minimum_version_android_store": 0,
      "app_url_android_store": null,
      "app_minimum_version_ios_store": 0,
      "app_url_ios_store": null,
      "app_minimum_version_android_deliveryman": 0,
      "app_url_android_deliveryman": null,
      "app_minimum_version_ios_deliveryman": 0,
      "app_url_ios_deliveryman": null,
      "customer_verification": false,
      "prescription_order_status": false,
      "schedule_order": false,
      "order_delivery_verification": false,
      "cash_on_delivery": true,
      "digital_payment": true,
      "digital_payment_info": {
        "digital_payment": true,
        "plugin_payment_gateways": false,
        "default_payment_gateways": true
      },
      "per_km_shipping_charge": 0,
      "minimum_shipping_charge": 0,
      "free_delivery_over": null,
      "demo": false,
      "maintenance_mode": false,
      "order_confirmation_model": "deliveryman",
      "show_dm_earning": false,
      "canceled_by_deliveryman": false,
      "canceled_by_store": true,
      "timeformat": "24",
      "language": [
        {
          "key": "en",
          "value": "English"
        },
        {
          "key": "fr",
          "value": "French - français"
        }
      ],
      "sys_language": [
        {
          "key": "en",
          "value": "English",
          "direction": "ltr",
          "default": false
        },
        {
          "key": "fr",
          "value": "French - français",
          "direction": "ltr",
          "default": true
        }
      ],
      "social_login": [
        {
          "login_medium": "google",
          "status": false
        },
        {
          "login_medium": "facebook",
          "status": false
        }
      ],
      "apple_login": [
        {
          "login_medium": "apple",
          "status": false,
          "client_id": ""
        }
      ],
      "toggle_veg_non_veg": true,
      "toggle_dm_registration": true,
      "toggle_store_registration": false,
      "refund_active_status": false,
      "schedule_order_slot_duration": 0,
      "digit_after_decimal_point": 0,
      "module_config": {
        "module_type": ["grocery", "food", "pharmacy", "ecommerce", "parcel"],
        "grocery": {
          "order_status": {
            "accepted": false
          },
          "order_place_to_schedule_interval": true,
          "add_on": false,
          "stock": true,
          "veg_non_veg": false,
          "unit": true,
          "order_attachment": false,
          "always_open": false,
          "all_zone_service": false,
          "item_available_time": false,
          "show_restaurant_text": false,
          "is_parcel": false,
          "organic": true,
          "cutlery": false,
          "common_condition": false,
          "basic": false,
          "description": "In this type, You can set delivery slot start after x minutes from current time, No available time for items and has stock for items."
        },
        "food": {
          "order_status": {
            "accepted": true
          },
          "order_place_to_schedule_interval": false,
          "add_on": true,
          "stock": false,
          "veg_non_veg": true,
          "unit": false,
          "order_attachment": false,
          "always_open": false,
          "all_zone_service": false,
          "item_available_time": true,
          "show_restaurant_text": true,
          "is_parcel": false,
          "organic": false,
          "cutlery": true,
          "common_condition": false,
          "basic": false,
          "description": "In this type, you can set item available time, no stock management for items and has an option to add add-on."
        },
        "pharmacy": {
          "order_status": {
            "accepted": false
          },
          "order_place_to_schedule_interval": false,
          "add_on": false,
          "stock": true,
          "veg_non_veg": false,
          "unit": true,
          "order_attachment": true,
          "always_open": false,
          "all_zone_service": false,
          "item_available_time": false,
          "show_restaurant_text": false,
          "is_parcel": false,
          "organic": false,
          "cutlery": false,
          "common_condition": true,
          "basic": true,
          "description": "In this type, the customer can upload a prescription when placing an order, No available time for items and has stock for items."
        },
        "ecommerce": {
          "order_status": {
            "accepted": false
          },
          "order_place_to_schedule_interval": false,
          "add_on": false,
          "stock": true,
          "veg_non_veg": false,
          "unit": true,
          "order_attachment": false,
          "always_open": true,
          "all_zone_service": true,
          "item_available_time": false,
          "show_restaurant_text": false,
          "is_parcel": false,
          "organic": false,
          "cutlery": false,
          "common_condition": false,
          "basic": false,
          "description": "In this type, No opening and closing time for the store, no available time for items and has stock for items."
        },
        "parcel": {
          "order_status": {
            "accepted": false
          },
          "order_place_to_schedule_interval": false,
          "add_on": false,
          "stock": false,
          "veg_non_veg": false,
          "unit": false,
          "order_attachment": false,
          "always_open": true,
          "all_zone_service": false,
          "item_available_time": false,
          "show_restaurant_text": false,
          "is_parcel": true,
          "organic": false,
          "cutlery": false,
          "common_condition": false,
          "basic": false,
          "description": ""
        }
      },
      "module": {
        "id": 1,
        "module_name": "Jayma Gade Gui",
        "module_type": "grocery",
        "thumbnail": "2024-02-17-65d0ea9791afe.png",
        "status": "1",
        "stores_count": 1,
        "created_at": "2023-08-16T05:01:17.000000Z",
        "updated_at": "2024-02-17T11:19:19.000000Z",
        "icon": "2024-02-17-65d0ea979142e.png",
        "theme_id": 1,
        "description": "<p>Jayma Gade Gui<\/p>",
        "all_zone_service": 0,
        "translations": [
          {
            "id": 1,
            "translationable_type": "App\\Models\\Module",
            "translationable_id": 1,
            "locale": "en",
            "key": "module_name",
            "value": "Jayma Gade Gui",
            "created_at": null,
            "updated_at": null
          },
          {
            "id": 2,
            "translationable_type": "App\\Models\\Module",
            "translationable_id": 1,
            "locale": "en",
            "key": "description",
            "value": "<p>Jayma Gade Gui<\/p>",
            "created_at": null,
            "updated_at": null
          }
        }
      },
      "parcel_per_km_shipping_charge": 0,
      "parcel_minimum_shipping_charge": 0,
      "landing_page_settings": null,
      "social_media": [],
      "footer_text": "TECH SUPPLY CONNECT @ 2024",
      "cookies_text": "Demo cookie text",
      "fav_icon": "2023-08-16-64dca5f544de1.png",
      "landing_page_links": {
        "app_url_android_status": "1",
        "app_url_android": "https://play.google.com/store/",
        "app_url_ios_status": "1",
        "app_url_ios": "https://www.apple.com/app-store/",
        "web_app_url_status": "1",
        "web_app_url": "https://stackfood.6amtech.com/"
      },
      "dm_tips_status": 0,
      "loyalty_point_exchange_rate": 0,
      "loyalty_point_item_purchase_point": 0,
      "loyalty_point_status": 0,
      "customer_wallet_status": 0,
      "ref_earning_status": 0,
      "ref_earning_exchange_rate": 0,
      "refund_policy": 1,
      "cancellation_policy": 0,
      "shipping_policy": 0,
      "loyalty_point_minimum_point": 0,
      "tax_included": 0,
      "home_delivery_status": 1,
      "takeaway_status": 1,
      "active_payment_method_list": [],
      "additional_charge_status": 0,
      "additional_charge_name": "Additional Charge",
      "additional_charge": 0,
      "partial_payment_status": 0,
      "partial_payment_method": "both",
      "dm_picture_upload_status": 1,
      "add_fund_status": 0,
      "offline_payment_status": 0,
      "websocket_status": 0,
      "websocket_url": "",
      "websocket_port": 6001,
      "websocket_key": "",
      "guest_checkout_status": 1,
      "disbursement_type": "manual",
      "restaurant_disbursement_waiting_time": 0,
      "dm_disbursement_waiting_time": 0
    }
    
  };
  
  const landingPageRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/react-landing-page`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        "X-localization": language,
        origin: process.env.NEXT_CLIENT_HOST_URL,
      },
    }
  );
  const landingPageData = async () => { landingPageRes ?  await landingPageRes.json() : 
    {
      "base_urls": {
        "header_icon_url": "https://apishop.jaymagadegui.sn/storage/app/public/header_icon",
        "header_banner_url": "https://apishop.jaymagadegui.sn/storage/app/public/header_banner",
        "testimonial_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/reviewer_image",
        "promotional_banner_url": "https://apishop.jaymagadegui.sn/storage/app/public/promotional_banner",
        "business_image_url": "https://apishop.jaymagadegui.sn/storage/app/public/business_image"
      },
      "header_title": "$Your e-Commerce!$",
      "header_sub_title": "Venture Starts Here",
      "header_tag_line": "More than just a reliable $eCommerce$ platform",
      "header_icon": "2023-08-16-64dcac0088f46.png",
      "header_banner": "2023-08-20-64e1e31738bbc.png",
      "company_title": "$6amMart$",
      "company_sub_title": "is Best Delivery Service Near You",
      "company_description": "6amMart is a one-stop shop for all your daily necessities. You can shop for groceries, and pharmacy items, order food, and send important parcels from one place to another from the comfort of your home.",
      "company_button_name": "Order Now",
      "company_button_url": "https://6ammart-react.6amtech.com/",
      "download_user_app_title": "Complete Multipurpose eBusiness Solution",
      "download_user_app_sub_title": "6amMart is a Laravel and Flutter Framework-based multi-vendor food, grocery, eCommerce, parcel, and pharmacy delivery system. It has six modules to cover all your business functions",
      "earning_title": "Let’s Start Earning with $6amMart$",
      "earning_sub_title": "Join our online marketplace revolution and boost your income.",
      "earning_seller_title": "Become a Seller",
      "earning_seller_sub_title": "Register as a seller & open a shop in 6amMart to start your business",
      "earning_seller_button_name": "Register",
      "earning_seller_button_url": "https://6ammart-admin.6amtech.com/store/apply",
      "earning_dm_title": "Become a $Delivery Man$",
      "earning_dm_sub_title": "Register as a delivery man and earn money",
      "earning_dm_button_name": "Register",
      "earning_dm_button_url": "https://6ammart-admin.6amtech.com/deliveryman/apply",
      "business_title": "$Let’s$",
      "business_sub_title": "Manage your business Smartly",
      "business_image": "2023-08-16-64dcad66585e9.png",
      "testimonial_title": "We $satisfied$ some Customer & Restaurant Owners",
      "testimonial_list": [
        {
          "id": 1,
          "name": "John Doe",
          "designation": "CTO",
          "review": "Very good Service.",
          "reviewer_image": "2023-08-16-64dcad86217a2.png",
          "company_image": "def.png",
          "status": 1,
          "created_at": "2023-08-16T05:35:42.000000Z",
          "updated_at": "2023-08-16T05:35:42.000000Z"
        }
      ],
      "fixed_newsletter_title": "Join Us!",
      "fixed_newsletter_sub_title": "Subscribe to our weekly newsletter and be a part of our journey to self-discovery and love.",
      "fixed_footer_description": "Connect with our social media and other sites to keep up to date",
      "fixed_promotional_banner": "2023-08-16-64dcadedb4fac.png",
      "promotion_banners": [
        { "img": "2023-08-16-64dcac89cd0fa.png" },
        { "img": "2023-08-16-64dcac93a324a.png" },
        { "img": "2023-08-16-64dcad5a24940.png" }
      ],
      "download_user_app_links": {
        "playstore_url_status": "1",
        "playstore_url": "https://play.google.com/store/",
        "apple_store_url_status": "1",
        "apple_store_url": "https://www.apple.com/app-store/"
      },
      "download_business_app_links": {
        "seller_playstore_url_status": "1",
        "seller_playstore_url": "https://play.google.com/store",
        "seller_appstore_url_status": "1",
        "seller_appstore_url": "https://www.apple.com/app-store/",
        "dm_playstore_url_status": "1",
        "dm_playstore_url": "https://play.google.com/store",
        "dm_appstore_url_status": "1",
        "dm_appstore_url": "https://www.apple.com/app-store/"
      }
    }
    
  };
  // Set cache control headers for 1 hour (3600 seconds)
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate"
  );

  return {
    props: {
      configData: config,
      landingPageData: landingPageData,
    },
  };
};