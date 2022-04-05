<?php
class ControllerExtensionModuleBestSeller extends Controller {
	public function index($setting) {
		$this->load->language('extension/module/bestseller');

		$this->load->model('catalog/product');

		$this->load->model('tool/image');

		$data['products'] = array();


        $results = $this->model_catalog_product->getBestSellerProducts($setting['limit']);

		if( $this->customer->isLogged() ){
			$this->load->model('account/wishlist');

			$wishlist = $this->model_account_wishlist->getWishlist();
			foreach( $wishlist as $key => $wishlist_item ){
				$wishlist[$key] = $wishlist_item['product_id'];
			}
		}else{
			$wishlist = isset($this->session->data['wishlist']) ? $this->session->data['wishlist'] : array();
		}

		if ($results) {
			foreach ($results as $result) {
				if ($result['image']) {
					$image = $this->model_tool_image->resize($result['image'], $setting['width'], $setting['height']);
				} else {
					$image = $this->model_tool_image->resize('placeholder.png', $setting['width'], $setting['height']);
				}

				if ($this->customer->isLogged() || !$this->config->get('config_customer_price')) {
					$price = $this->currency->format($this->tax->calculate($result['price'], $result['tax_class_id'], $this->config->get('config_tax')), $this->session->data['currency']);
				} else {
					$price = false;
				}

				if ((float)$result['special']) {
					$special = $this->currency->format($this->tax->calculate($result['special'], $result['tax_class_id'], $this->config->get('config_tax')), $this->session->data['currency']);
					$special_percent = ceil(abs((int)$price - (int)$special) / (int)$price * 100) . '%';
				} else {
					$special = false;
					$special_percent = false;
				}

				if ($this->config->get('config_tax')) {
					$tax = $this->currency->format((float)$result['special'] ? $result['special'] : $result['price'], $this->session->data['currency']);
				} else {
					$tax = false;
				}

				if ($this->config->get('config_review_status')) {
					$rating = $result['rating'];
				} else {
					$rating = false;
				}

				$in_wishlist = in_array( $result['product_id'], $wishlist );

                $categ = $this->model_catalog_product->getCategories($result['product_id']);
                $this->load->model('catalog/category');
                $category_info1 = $this->model_catalog_category->getCategory($categ[0]['category_id']);
                $catname = $category_info1['name'];

                $cathref = $this->url->link('product/category', 'path=' . $categ[0]['category_id']);

                $data['products'][] = array(
                    'cat'=> $catname,
					'cathref' => $cathref,
					'product_id'  => $result['product_id'],
					'thumb'       => $image,
					'name'        => $result['name'],
					'description' => utf8_substr(trim(strip_tags(html_entity_decode($result['description'], ENT_QUOTES, 'UTF-8'))), 0, $this->config->get('theme_' . $this->config->get('config_theme') . '_product_description_length')) . '..',
					'price'       => $price,
					'special'     => $special,
					'in_wishlist' => $in_wishlist,
					'special_percant' => $special_percent,
					'tax'         => $tax,
					'rating'      => $rating,
					'href'        => $this->url->link('product/product', 'product_id=' . $result['product_id'])
				);
			}

			return $this->load->view('extension/module/bestseller', $data);
		}
	}
}
