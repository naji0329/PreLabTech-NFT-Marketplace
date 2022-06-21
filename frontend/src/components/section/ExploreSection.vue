<template>
    <section class="explore-section pt-4">
            <div class="container">

                       <div class="row g-gs">
                          <div class="col-xl-3 col-lg-4 col-sm-6" v-for="product in products" :key="product.id">
                              <div class="card card-product mb-0">
                                <div class="card-image">
                                    <img :src="product.img" class="card-img-top" alt="art image">
                                </div>
                                <div class="card-body p-3">
                                  <div class="d-flex justify-content-between">
                                    <div>
                                      <h5 class="card-title text-truncate mb-0">Meebits</h5>
                                      <p>Meebits #{{product.id}}</p>
                                    </div>
                                    <div class="text-right" style="text-align: right">
                                      <h5 class="card-price-title">Price</h5>
                                      <p class="card-price-number">{{ product.price }} 
                                        <img src="@/images/tokens/eth.png" width="10" height="10" alt="eth icon" >
                                      </p>
                                    </div>
                                  </div>
                                    <!-- <div class="card-author mb-1 d-flex align-items-center">
                                        <span class="me-1 card-author-by">By</span>
                                        <div class="custom-tooltip-wrap">
                                            <router-link :to="product.authorLink" class="custom-tooltip author-link">{{ product.author }}</router-link>
                                        </div>
                                    </div> -->
                                    <!-- <div class="card-price-wrap d-flex align-items-center justify-content-sm-between">
                                        <div class="me-5 me-sm-2">
                                            <span class="card-price-title">Price</span>
                                            <span class="card-price-number">{{ product.price }} ETH</span>
                                        </div>
                                        <div class="text-sm-end">
                                            <span class="card-price-title">Current bid</span>
                                            <span class="card-price-number">{{ product.priceTwo }} ETH</span>
                                        </div>
                                    </div> -->
                                    <!-- <router-link to="product" class="btn btn-sm btn-primary">View NFT</router-link> -->
                                </div><!-- end card-body -->
                                <router-link
                                  class="details"
                                  :to="{
                                      name: 'ProductDetail',
                                      params: {
                                      id: product.id,
                                      title: product.title,
                                      metaText: product.metaText,
                                      price: product.price,
                                      priceTwo: product.priceTwo,
                                      imgLg: product.imgLg,
                                      metaText: product.metaText,
                                      metaTextTwo: product.metaTextTwo,
                                      metaTextThree: product.metaTextThree,
                                      content: product.content,
                                      }
                                  }"
                              >
                              </router-link>
                            </div><!-- end card -->
                          </div>
                       </div><!-- end row -->
            </div><!-- .container -->
    </section><!-- end explore-section -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from '@/store/store.js'

export default {
  name: 'ExploreSection',
  data () {
    return {
      SectionData,
      categoryMenu: [
        {
          id: 1,
          title: 'All',
          options: [
            {
              category: 'artworks'
            },
            {
              category: 'music'
            },
            {
              category: 'collectibles'
            },
            {
              category: 'games'
            },
            {
              category: 'metaverses'
            },
          ]
        },
        {
          id: 2,
          title: 'Artworks',
          options: [
            {
              category: 'artworks'
            }
          ]
        },
        {
          id: 3,
          title: 'Music',
          options: [
            {
              category: 'music'
            }
          ]
        },
        {
          id: 4,
          title: 'Collectibles',
          options: [
            {
              category: 'collectibles'
            }
          ]
        },
        {
          id: 5,
          title: 'Games',
          options: [
            {
              category: 'games'
            }
          ]
        },
        {
          id: 6,
          title: 'Metaverses',
          options: [
            {
              category: 'metaverses'
            }
          ]
        },
      ],
      products: [
        {
          id: 1,
          img: require('@/images/thumb/nft-2.jpg'),
          imgLg: require('@/images/thumb/nft-lg.jpg'),
          title: 'Meebits',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'ZeniconStudio',
          authorLink: 'author',
          name: 'art',
          price: '14.20',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.32 ETH',
          category: 'artworks'
        },
        {
          id: 2,
          img: require('@/images/thumb/nft3.jpg'),
          imgLg: require('@/images/thumb/nft-lg2.jpg'),
          title: 'Meebits',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'CanvaNetwork',
          authorLink: 'author',
          name: 'art',
          price: '10.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '0.32 ETH',
          category: 'artworks'
        },
        {
          id: 3,
          img: require('@/images/thumb/nft4.jpg'),
          imgLg: require('@/images/thumb/nft-lg3.jpg'),
          title: 'Unboxing The Compass',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'MoveNetwork',
          authorLink: 'author',
          name: 'music',
          price: '10.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.30 ETH',
          category: 'music'
        },
        {
          id: 4,
          img: require('@/images/thumb/nft5.jpg'),
          imgLg: require('@/images/thumb/nft-lg4.jpg'),
          title: 'Rendering by the Water',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'RukiStudio',
          authorLink: 'author',
          name: 'music',
          price: '13.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '2.30 ETH',
          category: 'music'
        },
        {
          id: 5,
          sort: 'recent',
          img: require('@/images/thumb/nft6.jpg'),
          imgLg: require('@/images/thumb/nft-lg5.jpg'),
          title: 'Divine Opulence',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'DvisionNetwork',
          authorLink: 'author',
          name: 'collectibles',
          price: '8.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.44 ETH',
          category: 'collectibles'
        },
        {
          id: 6,
          img: require('@/images/thumb/nft7.jpg'),
          imgLg: require('@/images/thumb/nft-lg6.jpg'),
          title: 'Sacral Metatron Cube',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'KamranMedia',
          authorLink: 'author',
          name: 'collectibles',
          price: '11.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.33 ETH',
          category: 'collectibles'
        },
        {
          id: 7,
          img: require('@/images/thumb/nft8.jpg'),
          imgLg: require('@/images/thumb/nft-lg7.jpg'),
          title: 'Girl warming up to a bed acrobat',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'JisanMedia',
          authorLink: 'author',
          name: 'metaverses',
          price: '10.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '2.33 ETH',
          category: 'metaverses'
        },
        {
          id: 8,
          img: require('@/images/thumb/nft9.jpg'),
          imgLg: require('@/images/thumb/nft-lg8.jpg'),
          title: 'Women Eyes Modern Art',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'RifiUnited',
          authorLink: 'author',
          name: 'metaverses',
          price: '12.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '3.33 ETH',
          category: 'metaverses'
        },
        {
          id: 9,
          img: require('@/images/thumb/nft16.jpg'),
          imgLg: require('@/images/thumb/nft-lg9.jpg'),
          title: 'Puffy Baby Bird #151',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'RadioCaca',
          authorLink: 'author',
          name: 'games',
          price: '11.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '2.33 ETH',
          category: 'games'
        },
        {
          id: 10,
          img: require('@/images/thumb/nft17.jpg'),
          imgLg: require('@/images/thumb/nft-lg10.jpg'),
          title: 'Wave1 - Titanium Ticket',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'InfinityArt',
          authorLink: 'author',
          name: 'games',
          price: '10.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.33 ETH',
          category: 'games'
        },
        {
          id: 11,
          img: require('@/images/thumb/nft18.jpg'),
          imgLg: require('@/images/thumb/nft-lg11.jpg'),
          title: 'Saggezza 2/4. Cartier Edition',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'InfinityArt',
          authorLink: 'author',
          name: 'art',
          price: '5.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.33 ETH',
          category: 'artworks'
        },
        {
          id: 12,
          img: require('@/images/thumb/nft19.jpg'),
          imgLg: require('@/images/thumb/nft-lg12.jpg'),
          title: 'Venus (Viktoria Veisbrut & SoldArt)',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'Viktoria',
          authorLink: 'author',
          name: 'art',
          price: '13.34',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.33 ETH',
          category: 'artworks'
        },
 

      ],
      productsTwo: [
        {
          id: 1,
          img: require('@/images/thumb/nft4.jpg'),
          imgLg: require('@/images/thumb/nft-lg3.jpg'),
          title: 'One Tribe Black Edition',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'ZeniconStudio',
          authorLink: 'author',
          name: 'art',
          price: '14.20',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.32 ETH',
          category: 'artworks'
        },
        {
          id: 2,
          img: require('@/images/thumb/nft5.jpg'),
          imgLg: require('@/images/thumb/nft-lg4.jpg'),
          title: 'Operation Jade Fury',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'CanvaNetwork',
          authorLink: 'author',
          name: 'art',
          price: '10.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '0.32 ETH',
          category: 'artworks'
        },
        {
          id: 3,
          img: require('@/images/thumb/nft6.jpg'),
          imgLg: require('@/images/thumb/nft-lg5.jpg'),
          title: 'Unboxing The Compass',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'MoveNetwork',
          authorLink: 'author',
          name: 'music',
          price: '10.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.30 ETH',
          category: 'music'
        },
        {
          id: 4,
          img: require('@/images/thumb/nft7.jpg'),
          imgLg: require('@/images/thumb/nft-lg6.jpg'),
          title: 'Rendering by the Water',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'RukiStudio',
          authorLink: 'author',
          name: 'music',
          price: '13.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '2.30 ETH',
          category: 'music'
        },

      ],
      productsThree: [
        {
          id: 1,
          sort: 'recent',
          img: require('@/images/thumb/nft6.jpg'),
          imgLg: require('@/images/thumb/nft-lg5.jpg'),
          title: 'Divine Opulence',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'DvisionNetwork',
          authorLink: 'author',
          name: 'collectibles',
          price: '8.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.44 ETH',
          category: 'collectibles'
        },
        {
          id: 2,
          img: require('@/images/thumb/nft7.jpg'),
          imgLg: require('@/images/thumb/nft-lg6.jpg'),
          title: 'Sacral Metatron Cube',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'KamranMedia',
          authorLink: 'author',
          name: 'collectibles',
          price: '11.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.33 ETH',
          category: 'collectibles'
        },
        {
          id: 3,
          img: require('@/images/thumb/nft8.jpg'),
          imgLg: require('@/images/thumb/nft-lg7.jpg'),
          title: 'Girl warming up to a bed acrobat',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'JisanMedia',
          authorLink: 'author',
          name: 'metaverses',
          price: '10.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '2.33 ETH',
          category: 'metaverses'
        },
      ],
      productsFour: [
        {
          id: 1,
          sort: 'recent',
          img: require('@/images/thumb/nft3.jpg'),
          imgLg: require('@/images/thumb/nft-lg2.jpg'),
          title: 'Divine Opulence',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'DvisionNetwork',
          authorLink: 'author',
          name: 'collectibles',
          price: '8.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.44 ETH',
          category: 'collectibles'
        },
        {
          id: 2,
          img: require('@/images/thumb/nft4.jpg'),
          imgLg: require('@/images/thumb/nft-lg3.jpg'),
          title: 'Sacral Metatron Cube',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'KamranMedia',
          authorLink: 'author',
          name: 'collectibles',
          price: '11.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.33 ETH',
          category: 'collectibles'
        },

      ],
      productsFive: [
        {
          id: 1,
          sort: 'recent',
          img: require('@/images/thumb/nft5.jpg'),
          imgLg: require('@/images/thumb/nft-lg4.jpg'),
          title: 'Divine Opulence',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'DvisionNetwork',
          authorLink: 'author',
          name: 'collectibles',
          price: '8.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.44 ETH',
          category: 'collectibles'
        },
        {
          id: 2,
          img: require('@/images/thumb/nft6.jpg'),
          imgLg: require('@/images/thumb/nft-lg5.jpg'),
          title: 'Sacral Metatron Cube',
          content: 'Digital-only* "CB Galaxy" style Coke Boys LA sneakers wearable in the Decentraland metaverse',
          author: 'KamranMedia',
          authorLink: 'author',
          name: 'collectibles',
          price: '11.00',
          metaText: 'Not for sale',
          metaTextTwo: '500 editions',
          metaTextThree: 'Highest bid <span class="text-primary fw-semibold">0.072 wETH</span>',
          currentPrice: '1.33 ETH',
          category: 'collectibles'
        },

      ],
      isFIlter: false,
      selectedTab: null,
      currentPage: 1,
      maxPerPage: 8,
      selectedId : 0,
      
    }
  },
  methods: {
    filterCategory(tab, id) {
      this.selectedTab = tab;
      this.isFIlter = true;
      this.selectedId = id;
    },
    loadMore() {
       this.currentPage += 1;
       this.isFIlter = false;
    },
    sorting (){
        this.products.sort((a, b) => a.price < b.price ? 1 : -1) 
    },
    sorting2 (){
        this.products.sort((a, b) => (a.price > b.price) ? 1 : -1)
    },

    // set active class on button
    getActiveClass(id) {
      if (id === this.activeId) {
        return "active";
      } else {
        return "";
      }
    }
  },
  computed: {
    filteredData () {
        // if(this.isFIlter == false) {
        //   return this.products.slice(0, this.currentPage * this.maxPerPage);
        // }
        return this.products.filter(data => {
            const opts = this.selectedTab.options.map(opt =>  opt.category);
            return opts.includes(data.category);
            
        })
    },
  }
}
</script>

<style lang="css" scoped>
 .details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
 }
 .author-link {
   z-index: 2;
   position: relative;
 }
</style>