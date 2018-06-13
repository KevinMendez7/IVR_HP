var audioStream = [
  {
	  id: "1",
	    name: "prepago",
	    rules: {
	      last: "",
	  	  now: {
	  		  id: "1",
	  		  flow: "audio",
	  		  type: "audio",
	  		  name: "welcome"

	  	  },
	  	  next: {
	  		  id: "1",
	  		  flow: "menu",
	  		  type: "menu",
	  		  name: "master"	  		  

	  	  }
	    },
	    list: [
	      {
	        id: "1",
	        type: "audio",
	        script: [
	          {
	            id: "1",
	            name: "welcome",
	            src: ["welcome_whatsapp"]
	          },
	          {
	            id: "2",
	            name: "error",
	            src: ["error_general"]
	          }
	        ]
	      },
	      {
	        id: "2",
	        type: "menu",
	        script: [
	          {
	            id: "1",
	            name: "master",
	            description: "principal menu",
	            src: ["master_menu_prep"]
	          },
	          {
	            id: "2",
	            name: "return",
	            description: "return menu option 1 from master menu with id 1",
	            src: ["return_menu"]
	          },
	          {
	        	id: "3",
	        	name: "market",
	        	description: "market menu option 2 from master menu with id 1",
	        	src: ["market_master_menu"]
	          },
	          {
		        id: "4",
		        name: "market_confirmation",
		        description: "confirmation menu from market menu with id 3",
		        src: ["market_confirmation_menu"]
	          },
	          {
	        	id: "5",
	        	name: "market_end",
	        	description: "next buy menu from market menu with id 3",
	        	src: ["market_menu_next_buy"]
	          }
	        ]
	      },
	      {
	        id: "3",
	        type: "option",
	        script: [
				{
				    id: "1",
				    name: "master",
				    list: [
				      {
				          id: "1",
				          option: "1",
				          rules: {
				            now: {
				              id: "1",
				              flow: "audio",
				              type: "option",
				              name: "balance",
				              num: "1"
				            },
				            next: {
				              id: "2",
				              flow: "menu",
				              type: "menu",
				              name: "return"
				            }
				          },
				          src: ["audio_balance", "audio_balance_expire","audio_plan"]
				        },
				        {
				          id: "2",
				          option: "2",
				          rules: {
				            now: {
				              id: "3",
				              flow: "menu",
				              type: "menu",
				              name: "market"
				            }
				          }
				        },
				        {
				          id: "3",
				          option: "3",
				          rules: {
				            now: {
				              id: "1",
				              flow: "backend",
				              type: "backend",
				              name: "infoMTH"
				            },
				            next: {
				              id: "2",
				              flow: "menu",
				              type: "menu",
				              name: "return"
				            }
				          },
				          src: ["audio_return_info_mth"]
				        },
				        {
				          id: "4",
				          option: "0",
				          rules: {
				            now: {
				              id: "1",
				              flow: "transfer",
				              type: "option",
				              name: "transfer",
				              num: "0"
				            }
				          },
				          src: ["audio_transfer"]
				        }
				    ]
				  },
				  {
				    id: "2",
				    name: "return",
				    list: [
						{
						    id: "1",
						    option: "8",
						    rules: {
						      now: {
						        id: "1",
						        flow: "menu",
						        type: "menu",
						        name: "master"
						      }
						    }						    
						},
						{
							id: "2",
							option: "9",
							rules: {
								now: {
									id: "1",
									flow: "disconnect",
									type: "end"
								}
							}
						}
				    ]				  
				  },
				  {
					    id: "3",
					    name: "market",
					    list: [
							{
							    id: "1",
							    option: "1",
							    rules: {
							      now: {
							        id: "4",
							        flow: "menu",
							        type: "menu",
							        name: "market_confirmation"
							      },
							      next: {
							    	  id: "5",
							    	  flow: "menu",
							    	  type: "menu",
							    	  name: "market_end"
							      }
							    }						    
							},
							{
							    id: "2",
							    option: "2",
							    rules: {
							      now: {
							        id: "4",
							        flow: "menu",
							        type: "menu",
							        name: "market_confirmation"
							      },
							      next: {
							    	  id: "5",
							    	  flow: "menu",
							    	  type: "menu",
							    	  name: "market_end"
							      }
							    }						    
							},
							{
							    id: "3",
							    option: "3",
							    rules: {
							      now: {
							        id: "4",
							        flow: "menu",
							        type: "menu",
							        name: "market_confirmation"
							      },
							      next: {
							    	  id: "5",
							    	  flow: "menu",
							    	  type: "menu",
							    	  name: "market_end"
							      }
							    }						    
							},
							{
							    id: "4",
							    option: "4",
							    rules: {
							      now: {
							        id: "4",
							        flow: "menu",
							        type: "menu",
							        name: "market_confirmation"
							      },
							      next: {
							    	  id: "5",
							    	  flow: "menu",
							    	  type: "menu",
							    	  name: "market_end"
							      }
							    }						    
							}
					    ]				  
					  },
					  {
						  id: "4",
						  name: "market_confirmation",
						  list:  [
							{
							    id: "1",
							    option: "1",
							    rules: {
							      now: {
							        id: "4",
							        flow: "menu",
							        type: "menu",
							        name: "market_confirmation"
							      }
							    }						    
							},
							{
							    id: "2",
							    option: "2",
							    rules: {
							      now: {
							    	  id: "3",
							    	  flow: "menu",
							    	  type: "menu",
							    	  name: "market"
							      }
							    }						    
							}
						  ]
					  },
					  {
						  id: "5",
						  name: "market_end",
						  list:  [
							{
							    id: "1",
							    option: "1",
							    rules: {
							      now: {
							        id: "3",
							        flow: "menu",
							        type: "menu",
							        name: "market"
							      }
							    }						    
							},
							{
							    id: "2",
							    option: "1",
							    rules: {
							      now: {
							        id: "1",
							        flow: "disconnect",
							        type: "end",
							        name: "disconnect"
							      }
							    }						    
							}
						  ]
					  }
	        ]
	      }
	    ]
  },
  {
	  id: "2",
	  name: "pospago",
	  list: [
	    {
	    	id: "1",
	        type: "info",
	        script: [
	          {
	            id: "1",
	            name: "welcome",
	            src: ["welcome_whatsapp"]
	          },
	          {
	            id: "2",
	            name: "error",
	            src: ["error_general"]
	          }
	        ]
	    },
	    {
	    	id: "2",
	        type: "menu",
	        script: [
	          {
	            id: "1",
	            name: "master",
	            src: ["master_menu_pos"]
	          },
	          {
	            id: "2",
	            name: "return",
	            src: ["return_menu"]
	          }
	        ]
	    },
	    {
	    	id: "3",
	        type: "option",
	        script: [
	          {
	            id: "1",
	            option: "1",
	            name: "invoiceAudio",
	            src: ["audio_info_mth","audio_last_invoice","audio_total_invoice","audio_expire_invoice"]
	          },
	          {
	            id: "2",
	            option: "2",
	            name: "consumedAudio",
	  					src: []
	          },
	          {
	            id: "3",
	            option: "3",
	            name: "infoMTH",
	            src: ["audio_return_info_mth"]
	          },
	          {
	            id: "4",
	            option: "0",
	            name: "transfer",
	            src: ["audio_transfer"]
	          }
	        ]
	    }
	]
  },
  {
    id: "3",
    name: "plan_libre",
    list: [

    ]
  }
]