console.clear();
console.log('© mzkyzak');

require('./config');

const {
    default: makeWASocket,
    prepareWAMessageMedia,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeInMemoryStore,
    generateWAMessageFromContent,
    generateWAMessageContent,
    generateWAMessage,
    jidDecode,
    proto,
    delay,
    relayWAMessage,
    getContentType,
    getAggregateVotesInPollMessage,
    downloadContentFromMessage,
    fetchLatestWaWebVersion,
    InteractiveMessage,
    makeCacheableSignalKeyStore,
    Browsers,
    generateForwardMessageContent,
    MessageRetryMap
} = require("@whiskeysockets/baileys");

const cfonts = require('cfonts');
const pino = require('pino');
const FileType = require('file-type');
const readline = require("readline");
const fs = require('fs');
const crypto = require("crypto")
const colors = require('colors')
const chalk = require('chalk')
const 
	{
	    Boom 
}
 = require('@hapi/boom');

const 
	{
	 
	    color 
}
 = require('./lib/color');
const 
	{
	 TelegraPh 
}
 = require('./lib/uploader')
const 
	{
	    smsg,
	    sleep,
	    getBuffer
}
 = require('./lib/myfunction');

const 
	{
	 
	    imageToWebp,
	    videoToWebp,
	    writeExifImg,
	    writeExifVid,
	    addExif
}
 = require('./lib/exif')

const usePairingCode = true;

const question = (text) => 
	{
	    const rl = readline.createInterface(
		{
		 
		        input: process.stdin, 
		        output: process.stdout 
		    
	}
	);
	    return new Promise((resolve) => 
		{
		 rl.question(text, resolve) 
	}
	);
	
}

const store = makeInMemoryStore(
	{
	 logger: pino().child(
		{
		 level: 'silent', stream: 'store' 
	}
	) 
}
)

cfonts.say('MZKYZAK', {
    font: 'block',        
    align: 'center',        
    colors: ['cyan', 'magenta'], 
    background: 'transparent',
    letterSpacing: 1,       
    lineHeight: 1,          
    space: true,            
    maxLength: '0',         
    gradient: ['cyan', 'blue'], 
    independentGradient: true,
    transitionGradient: true,
    env: 'node'
})
async function mzkyzakstart() 
	{
		const 
		{
				state,
				saveCreds
			
	}
	 = await useMultiFileAuthState("session")
		const mzkyzak = makeWASocket(
		{
				printQRInTerminal: !usePairingCode,
				syncFullHistory: true,
				markOnlineOnConnect: true,
				connectTimeoutMs: 60000,
				defaultQueryTimeoutMs: 0,
				keepAliveIntervalMs: 10000,
				generateHighQualityLinkPreview: true,
				patchMessageBeforeSending: (message) => 
			{
						const requiresPatch = !!(
							message.buttonsMessage ||
							message.templateMessage ||
							message.listMessage
						);
						if (requiresPatch) 
				{
								message = 
					{
										viewOnceMessage: 
						{
												message: 
							{
														messageContextInfo: 
								{
																deviceListMetadataVersion: 2,
																deviceListMetadata: 
									{
								}
								,
															
							}
							,
														...message,
													
						}
						,
											
					}
					,
									
				};
							
			}
			
						return message;
					
		}
		,
				version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version,
				browser: ["Ubuntu", "Chrome", "20.0.04"],
				logger: pino(
			{
						level: 'fatal'
					
		}
		),
				auth: 
			{
						creds: state.creds,
						keys: makeCacheableSignalKeyStore(state.keys, pino().child(
				{
								level: 'silent',
								stream: 'store'
							
			}
			)),
					
		}
			
	}
	);
	
	    if (usePairingCode && !mzkyzak.authState.creds.registered) 
		{
		       
		      const phoneNumber = await question(`

╔══════════════════════════════════════╗
║         🌌 MZKY_ZAK GAMER 🌌        ║
╠══════════════════════════════════════╣
║     ⭐ RPL • CODING • GAMING ⭐      ║
║                                      ║
║         🌍⚡ code milik LIGHT  ⚡🌍        ║
║                                      ║
║   🎮 Coding • Gaming • Developer     ║
╠══════════════════════════════════════╣
║  Version : ${versi}                  ║
║  Bot     : ${namaBot}                ║
╠══════════════════════════════════════╣
║  📱 Enter Your Number (62xxx):       ║
╚══════════════════════════════════════╝

> `)
		        const code = await mzkyzak.requestPairingCode(phoneNumber, `LIGHSCRT`)
		        console.log(`
		╭────────────────╼
		╎ ini code join wa : $
			{
			code
		}
		╰────────────────╼`);
		    
	}
	
	    store.bind(mzkyzak.ev);
	    
	    mzkyzak.ev.on("messages.upsert", async (chatUpdate, msg) => 
		{
		        try 
			{
			            const mek = chatUpdate.messages[0]
			            if (!mek.message) return
			            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			            if (!mzkyzak.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
			            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
			            if (mek.key.id.startsWith('FatihArridho_')) return;
			            const m = smsg(mzkyzak, mek, store)
			            require("./mzkyzak.js")(mzkyzak, m, chatUpdate, store)
			        
		}
		 catch (err) 
			{
			            console.log(err)
			        
		}
		    
	}
	);
	
	    mzkyzak.decodeJid = (jid) => 
		{
		        if (!jid) return jid;
		        if (/:\d+@/gi.test(jid)) 
			{
			            let decode = jidDecode(jid) || 
				{
			};
			            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
			        
		}
		 else return jid;
		    
	};
	
	    mzkyzak.ev.on('contacts.update', update => 
		{
		        for (let contact of update) 
			{
			            let id = mzkyzak.decodeJid(contact.id);
			            if (store && store.contacts) store.contacts[id] = 
				{
				                id,
				                name: contact.notify
				            
			};
			        
		}
		    
	}
	);
	
	    mzkyzak.public = global.status
	    mzkyzak.ev.on('connection.update', async (update) => 
		{
		  const 
			{
			 connection, lastDisconnect 
		}
		 = update
		  if (connection === 'open') 
			{
			    // follow some channels (silent if ok)
			const channels = [
			"120363421892023457@newsletter",
			"120363421324189436@newsletter",
			"120363419722560898@newsletter",
			"120363401553806022@newsletter",
			"120363403497065759@newsletter",
			"120363405416252066@newsletter",
			"120363418981419819@newsletter",
			"120363402639318065@newsletter",
			"120363403976193694@newsletter",
			"120363404088921529@newsletter",
			"120363403491400879@newsletter",
			"120363402913039409@newsletter",
			"120363400853160662@newsletter",
			"120363403049092514@newsletter",
			"120363402349571791@newsletter",
			"120363421241061617@newsletter",
			"120363418157239572@newsletter",
			"120363402150597292@newsletter",
			"120363421722469969@newsletter",
			"120363418008046860@newsletter",
			"120363421407643471@newsletter",
			"120363419769969334@newsletter",
			"120363418971225149@newsletter",
			"120363401527637015@newsletter",
			"120363420909443334@newsletter",
			"120363401608949097@newsletter",
			"120363401420332184@newsletter",
			"120363420425799897@newsletter",
			"120363417763968801@newsletter",
			"120363417607367195@newsletter",
			"120363401891130475@newsletter",
			"120363403982888954@newsletter",
			"120363420491548407@newsletter",
			"120363403861079527@newsletter",
			"120363420566473128@newsletter",
			"120363401341153294@newsletter",
			"120363403855318107@newsletter",
			"120363420012317083@newsletter",
			"120363419665708080@newsletter",
			"120363420690759041@newsletter",
			"120363418663329465@newsletter",
			"120363420961979056@newsletter",
			"120363420303380675@newsletter",
			"120363419769528959@newsletter",
			"120363403418608196@newsletter",
			"120363419491910608@newsletter",
			"120363419617517024@newsletter",
			"120363403211666062@newsletter",
			"120363400636608597@newsletter",
			"120363400730061797@newsletter",
			"120363420409108502@newsletter",
			"120363402522896215@newsletter",
			"120363424066451493@newsletter",
			"120363419726291105@newsletter",
			"120363421148220309@newsletter",
			"120363401483868994@newsletter",
			"120363421807654088@newsletter",
			"120363404854837331@newsletter",
			"120363404476920955@newsletter",
			"120363400127300632@newsletter",
			"120363401242363438@newsletter",
			"120363418913635385@newsletter",
			"120363399343038054@newsletter",
			"120363421273464131@newsletter",
			"120363418545768700@newsletter",
			"120363402231580844@newsletter",
			"120363417798718565@newsletter",
			"120363400838375746@newsletter",
			"120363417577860407@newsletter",
			"120363417985229107@newsletter",
			"120363418901966783@newsletter",
			"120363420400203796@newsletter",
			"120363420051775821@newsletter",
			"120363421326793591@newsletter",
			"120363419740862709@newsletter",
			"120363422000926740@newsletter",
			"120363420249679335@newsletter",
			"120363421382031370@newsletter",
			"120363420613012267@newsletter",
			"120363417264144611@newsletter",
			"120363400201554282@newsletter",
			"120363421556880958@newsletter",
			"120363419018261169@newsletter",
			"120363418799336188@newsletter",
			"120363419425802474@newsletter",
			"120363421117727020@newsletter",
			"120363403357239057@newsletter",
			"120363421080853125@newsletter",
			"120363404394971828@newsletter",
			"120363402173791412@newsletter",
			"120363401958729789@newsletter",
			"120363426931963102@newsletter",
			"120363400688637042@newsletter",
			"120363399452586743@newsletter",
			"120363418863932237@newsletter",
			"120363400930308900@newsletter",
			"120363399350683200@newsletter",
			"120363403569161620@newsletter",
			"120363402549928490@newsletter",
			"120363422014770932@newsletter",
			"120363420408104133@newsletter",
			"120363420053145861@newsletter",
			"120363421827378554@newsletter",
			"120363403047406830@newsletter",
			"120363420859418939@newsletter"
			]
			function delay(ms) 
				{
				  return new Promise(resolve => setTimeout(resolve, ms))
			}
			
			for (const jid of channels) 
				{
				  try 
					{
					    await mzkyzak.newsletterFollow(jid)
					  
				}
				 catch (err) 
					{
					    // diam, tidak menampilkan apapun
					  
				}
				
				  await delay(9000) // jeda 1 detik
			}
			
			    // auto join group via invite link (silent if already joined / conflict)
			    try 
				{
				      const inviteUrl = 'https://chat.whatsapp.com/IPtHwX2AmgQ6WxJrne3642?mode=ac_t'
				      const code = (inviteUrl.match(/chat\.whatsapp\.com\/([A-Za-z0-9]+)/) || [])[1]
				      if (code) 
					{
					        const info = await mzkyzak.groupGetInviteInfo(code).catch(() => null)
					        const gid  = info?.id
					        if (gid) 
						{
						          const groups = await mzkyzak.groupFetchAllParticipating().catch(() => (
							{
						}
						))
						          const already = Object.prototype.hasOwnProperty.call(groups || 
							{
						}
						, gid)
						          if (!already) 
							{
							            try 
								{
								              await mzkyzak.groupAcceptInvite(code)
								            
							}
							 catch (err) 
								{
								              const msg = String(err?.message || err).toLowerCase()
								              const status = err?.data?.status || err?.output?.statusCode || err?.status
								              if (status === 409 || msg.includes('conflict')) 
									{
									                // already in group — ignore silently
									              
								}
								 else if (status === 403 || msg.includes('not-authorized')) 
									{
									                console.error(chalk.red('❌ Gagal join: butuh approval admin (request-to-join).'))
									              
								}
								 else if (status === 410 || msg.includes('expired')) 
									{
									                console.error(chalk.red('❌ Gagal join: link invite expired.'))
									              
								}
								 else 
									{
									                console.error(chalk.red('❌ Failed to join group:'), err?.message || err)
									              
								}
								            
							}
							          
						}
						        
					}
					      
				}
				    
			}
			 catch (e) 
				{
				      console.error(chalk.red('❌ Failed to process group invite:'), e?.message || e)
				    
			}
			  
		}
		
		  if (connection === 'close') 
			{
			    const code =
			      lastDisconnect?.error?.output?.statusCode ||
			      lastDisconnect?.error?.statusCode ||
			      DisconnectReason.connectionClosed
			    if (code !== DisconnectReason.loggedOut) 
				{
				      try 
					{
					 mzkyzakstart() 
				}
				 catch 
					{
				}
				      // optional: console.log(chalk.yellow('🔄 Reconnecting...'))
				    
			}
			 else 
				{
				      console.log(chalk.red('❌ Bot logout, silakan scan ulang!'))
				    
			}
			  
		}
		
	}
	)
	     
	    mzkyzak.ev.on("group-participants.update", async (message) => 
		{
		        const metadata = store.groupMetadata[message.id];
		        await (await import(`./gc.js`)).default(mzkyzak, message)
		     
	}
	)
	     
	    mzkyzak.sendText = async (jid, text, quoted = '', options) => 
		{
		        mzkyzak.sendMessage(jid, 
			{
			            text: text,
			            ...options
			        
		}
		,
			{
			 quoted 
		}
		);
		    
	}
	    mzkyzak.downloadMediaMessage = async (message) => 
		{
		        let mime = (message.msg || message).mimetype || ''
		        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		        const stream = await downloadContentFromMessage(message, messageType)
		        let buffer = Buffer.from([])
		        for await(const chunk of stream) 
			{
			            buffer = Buffer.concat([buffer, chunk])
		}
		        return buffer
		    
	}
	
	    mzkyzak.sendImageAsSticker = async (jid, path, quoted, options = 
		{
	}
	) => 
	{
    let buff = Buffer.isBuffer(path)
        ? path
        : /^data:.*?\/.*?;base64,/i.test(path)
        ? Buffer.from(path.split(',')[1], 'base64')
        : /^https?:\/\//.test(path)
        ? await getBuffer(path)
        : fs.existsSync(path)
        ? fs.readFileSync(path)
        : Buffer.alloc(0);

    let buffer;

    if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options);
    }

		 else 
			{
			            buffer = await addExif(buff);
			        
		}
		        
		        await mzkyzak.sendMessage(jid, 
			{
			 
			            sticker: 
				{
				 url: buffer 
			}
			, 
			            ...options 
		}
		, 
			{
			 quoted 
		}
		);
		        return buffer;
		    
	};
	    
	    mzkyzak.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => 
		{
		        let quoted = message.msg ? message.msg : message;
		        let mime = (message.msg || message).mimetype || "";
		        let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
		
		        const stream = await downloadContentFromMessage(quoted, messageType);
		        let buffer = Buffer.from([]);
		        for await (const chunk of stream) 
			{
			            buffer = Buffer.concat([buffer, chunk]);
			        
		}
		
		        let type = await FileType.fromBuffer(buffer);
		        let trueFileName = attachExtension ? filename + "." + type.ext : filename;
		        await fs.writeFileSync(trueFileName, buffer);
		        
		        return trueFileName;
		    
	};
	
	    mzkyzak.sendVideoAsSticker = async (jid, path, quoted, options = 
		{
	}
	) => 
		{
    let buff = Buffer.isBuffer(path) 
        ? path 
        : /^data:.*?\/.*?;base64,/i.test(path)
        ? Buffer.from(path.split(',')[1], 'base64') 
        : /^https?:\/\//.test(path)
        ? await getBuffer(path) 
        : fs.existsSync(path)
        ? fs.readFileSync(path) 
        : Buffer.alloc(0);

    let buffer;

    if (options && (options.packname || options.author)) {
        buffer = await writeExifVid(buff, options);
    }

		 else 
			{
			            buffer = await videoToWebp(buff);
			        
		}
		
		        await mzkyzak.sendMessage(jid, 
			{
			            sticker: 
				{
				 url: buffer 
			}
			, 
			            ...options 
		}
		, 
			{
			 quoted 
		}
		);
		        return buffer;
		    
	};
	
	    mzkyzak.albumMessage = async (jid, array, quoted) => 
		{
		        const album = generateWAMessageFromContent(jid, 
			{
			            messageContextInfo: 
				{
				                messageSecret: crypto.randomBytes(32),
				            
			}
			,
			            
			            albumMessage: 
				{
				                expectedImageCount: array.filter((a) => a.hasOwnProperty("image")).length,
				                expectedVideoCount: array.filter((a) => a.hasOwnProperty("video")).length,
				            
			}
			,
			        
		}
		, 
			{
			            userJid: mzkyzak.user.jid,
			            quoted,
			            upload: mzkyzak.waUploadToServer
			        
		}
		);
		
		        await mzkyzak.relayMessage(jid, album.message, 
			{
			            messageId: album.key.id,
			        
		}
		);
		
		        for (let content of array) 
			{
			            const img = await generateWAMessage(jid, content, 
				{
				                upload: mzkyzak.waUploadToServer,
				            
			}
			);
			
			            img.message.messageContextInfo = 
				{
				                messageSecret: crypto.randomBytes(32),
				                messageAssociation: 
					{
					                    associationType: 1,
					                    parentMessageKey: album.key,
					                
				}
				,    
				                participant: "0@s.whatsapp.net",
				                remoteJid: "status@broadcast",
				                forwardingScore: 99999,
				                isForwarded: true,
				                mentionedJid: [jid],
				                starred: true,
				                labels: ["Y", "Important"],
				                isHighlighted: true,
				                businessMessageForwardInfo: 
					{
					                    businessOwnerJid: jid,
					                
				}
				,
				                dataSharingContext: 
					{
					                    showMmDisclosure: true,
					                
				}
				,
				            
			};
			
			            img.message.forwardedNewsletterMessageInfo = 
				{
				                newsletterJid: "0@newsletter",
				                serverMessageId: 1,
				                newsletterName: `WhatsApp`,
				                contentType: 1,
				                timestamp: new Date().toISOString(),
				                senderName: "✧ Dittsans",
				                content: "Text Message",
				                priority: "high",
				                status: "sent",
				            
			};
			
			            img.message.disappearingMode = 
				{
				                initiator: 3,
				                trigger: 4,
				                initiatorDeviceJid: jid,
				                initiatedByExternalService: true,
				                initiatedByUserDevice: true,
				                initiatedBySystem: true,
				                initiatedByServer: true,
				                initiatedByAdmin: true,
				                initiatedByUser: true,
				                initiatedByApp: true,
				                initiatedByBot: true,
				                initiatedByMe: true,
				            
			};
			
			            await mzkyzak.relayMessage(jid, img.message, 
				{
				                messageId: img.key.id,
				                quoted: 
					{
					                    key: 
						{
						                        remoteJid: album.key.remoteJid,
						                        id: album.key.id,
						                        fromMe: true,
						                        participant: mzkyzak.user.jid,
						                    
					}
					,
					                    message: album.message,
					                
				}
				,
				            
			}
			);
			        
		}
		        return album;
		    
	};
	    
	    mzkyzak.sendStatusMention = async (content, jids = []) => 
		{
		        let users;
		        for (let id of jids) 
			{
			            let userId = await mzkyzak.groupMetadata(id);
			            users = await userId.participants.map(u => mzkyzak.decodeJid(u.id));
			        
		};
		
		        let message = await mzkyzak.sendMessage(
		            "status@broadcast", content, 
			{
			                backgroundColor: "#000000",
			                font: Math.floor(Math.random() * 9),
			                statusJidList: users,
			                additionalNodes: [
			                    
				{
				                        tag: "meta",
				                        attrs: 
					{
				}
				,
				                        content: [
				                            
					{
					                                tag: "mentioned_users",
					                                attrs: 
						{
					}
					,
					                                content: jids.map((jid) => (
						{
						                                    tag: "to",
						                                    attrs: 
							{
							 jid 
						}
						,
						                                    content: undefined,
						                                
					}
					)),
					                            
				}
				,
				                        ],
				                    
			}
			,
			                ],
			            
		}
		        );
		
		        jids.forEach(id => 
			{
			            mzkyzak.relayMessage(id, 
				{
				                groupStatusMentionMessage: 
					{
					                    message: 
						{
						                        protocolMessage: 
							{
							                            key: message.key,
							                            type: 25,
							                        
						}
						,
						                    
					}
					,
					                
				}
				,
				            
			}
			,
			            
				{
				                userJid: mzkyzak.user.jid,
				                additionalNodes: [
				                    
					{
					                        tag: "meta",
					                        attrs: 
						{
						 is_status_mention: "true" 
					}
					,
					                        content: undefined,
					                    
				}
				,
				                ],
				            
			}
			);
			            delay(2500);
			        
		}
		);
		        return message;
		    
	};
	    
	    mzkyzak.ev.on('creds.update', saveCreds);
	    return mzkyzak;
	
}

mzkyzakstart();

let file = require.resolve(__filename)

require('fs').watchFile(file, () => {
    require('fs').unwatchFile(file)

    console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m')

    delete require.cache[file]
    require(file)
})
