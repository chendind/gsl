<!-- 市联概况 -->
<template>
  <div>
    <div class="top1 bg-white after">
      <div class="rightlogo">
        <img :src="require('@/assets/image/logo.png')" alt="">
      </div>
      <div class="meta">
        <p class="title_top">杭州市工商业联合会</p>
        <p class="title_top">杭州市总商会</p>
        <p class="icon_top"><img :src="require('@/assets/image/phone.png')"><span>0571-87922923</span></p>
        <p class="icon_top"><img :src="require('@/assets/image/addr.png')"><span>杭州市惠民路24号</span></p>
      </div>
      <grid class="grid" :rows="3">
        <grid-item class="grid-item grid-item2" @on-item-click="scrollTo(1)">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/ldbz.png')">
          <span slot="label" class="grid-item-label">领导班子</span>
        </grid-item>
        <grid-item class="grid-item grid-item2" @on-item-click="scrollTo(2)">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/shzc.png')">
          <span slot="label" class="grid-item-label">商会章程</span>
        </grid-item>
        <grid-item class="grid-item grid-item2" @on-item-click="scrollTo(3)">
          <img slot="icon" class="grid-item-icon" :src="require('@/assets/image/glbf.png')">
          <span slot="label" class="grid-item-label">入会指南</span>
        </grid-item>
      </grid>
    </div>
    <div id="all_content" class="scroll-box">
      <div id="item0" class="mui-control-content">
          <div class="content_box after">
              <h3 align="center">商会简介</h3>
              <p>杭州市工商业联合会成立于1951年，是中国共产党领导的以非公有制企业和非公有制经济人士为主体的，具有统战性、经济性、民间性有机统一基本特征的人民团体和商会组织，是党和政府联系非公有制经济人士的桥梁纽带，是政府管理和服务非公有制经济的助手。</p>
              <p>工商联工作是中国共产党统一战线工作和经济工作的重要内容。工商联工作对象主要包括私营企业、非公有制经济成份控股的有限责任公司和股份有限公司、港澳投资企业等，私营企业出资人、个体工商户、在内地投资的港澳工商界人士等。工商联围绕促进非公有制经济健康发展和非公有制经济人士健康成长的主题，履行职责、发挥作用。基本任务是：加强思想政治工作，引导非公有制经济人士学习贯彻党的路线方针政策，遵守国家法律法规，培养拥护党的领导、走中国特色社会主义道路的非公有制经济人士队伍；参加政治协商，发挥民主监督作用，积极参政议政；推动经贸交流和协作，促进经济社会发展；加强行业协会商会建设，服务非公有制企业发展；参与协调劳动关系，促进社会和谐稳定；反映非公有制企业和非公有制经济人士利益诉求，维护其合法权益。</p>
              <p>杭州市工商联现有驻会领导6名，兼职的企业家副主席25名、总商会副会长18名、副秘书长4名。设有五处一室和机关党委。编制44人，实际在编人员43名。</p>
              <p>工商联所属商会是工商联的基础组织和工作依托。工商联对所属商会工作进行指导、引导和服务。截止2016年底，共有会员32785个，基层商会392个，直属商会50个，其中行业商会21个，异地商会28个，新生代企业家联谊会1个</p>
              <p><img border="0" alt="" src="/upload/2003-8-1115-50-08.7055475.jpg"></p>
          </div>
      </div>
      <div id="item1" class="mui-control-content">
          <div style="font-size: 18px" class="text-center mv10">杭州市工商联驻会</div>
          <div class="text-center mv10">主席、副主席、秘书长</div>
          <div class="content_box after">
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03090142155.png">
                  <p>主 席：冯仁强</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2012_07/23110048114.jpg">
                  <p>党组书记、常务副主席：邵根松</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/03155035152.jpg">
                  <p>党组成员、副主席：崔小平</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03101324610.jpg?v=55"> -->
                  <!-- <img border="0" src=" /uploadPic/2011_08/01085855279.jpg?v=33"> -->
                  <img border="0" src=" /uploadPic/2017_02/chengang.jpg">

                  <p>党组成员、副主席：陈刚</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03101324610.jpg?v=44"> -->
                  <img border="0" src="/uploadPic/2016_11/mao.jpg?v=44">
                  <p>党组成员、巡视员：毛福俊</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03101441930.jpg"> -->
                  <img border="0" src="/uploadPic/2016_11/huang.jpg">
                  <p>党组成员、秘书长：黄凯旋</p>
              </div>
          </div>
          <p class="">杭州市工商联企业家副主席</p>
          <div class="content_box after">
              <div class="content_box_inside">
                  <img border="0" src="/upload/2006-10-2310-43-12.7055475.jpg">
                  <p>副主席：宗庆后</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_07/29102600883.jpg">
                  <p>副主席：朱明虬</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01094640128.jpg">
                  <p>副主席：汪力成</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01095630198.jpg">
                  <p>副主席：潘余明</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01095848549.jpg">
                  <p>副主席：吴建荣</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01100003909.jpg">
                  <p>副主席：朱国锭</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01100027516.jpg">
                  <p>副主席：胡季强</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03141501105.jpg"> -->
                  <img border="0" src="/uploadPic/2017_02/03141501105.jpg">
                  <p>副主席：胡惠康</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_03/14144920902.bmp"> -->
                  <img border="0" src="/uploadPic/2017_02/14144920902.jpg">
                  <p>副主席：施人玮</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03152915658.jpg"> -->
                  <img border="0" src="/uploadPic/2017_02/03152915658.jpg">
                  <p>副主席：倪良正</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01101604165.jpg">
                  <p>副主席：张涌森</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2011_08/01101939964.jpg"> -->
                  <img border="0" src="/uploadPic/2017_02/01101939964.jpg">
                  <p>副主席：管建平</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01101732518.jpg">
                  <p>副主席：吴忠泉</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_03/14145948426.jpg">
                  <p>副主席：屠红燕</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03142220972.jpg">
                  <p>副主席：叶惠忠</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03144503354.JPG"> -->
                  <img border="0" src="/uploadPic/2017_02/03144503354.jpg">
                  <p>副主席：周国明</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03144645951.JPG"> -->
                  <img border="0" src="/uploadPic/2017_02/03144645951.jpg">
                  <p>副主席：胡宝泉</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03145044380.JPG"> -->
                  <img border="0" src="/uploadPic/2017_02/03145044380.jpg">
                  <p>副主席：陆关林</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03151047870.jpg">
                  <p>副主席：王坚</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03154449832.JPG"> -->
                  <img border="0" src="/uploadPic/2017_02/03154449832.jpg">
                  <p>副主席：章方祥</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03130019963.jpg">
                  <p>副主席：方能斌</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03150849382.JPG"> -->
                  <img border="0" src="/uploadPic/2017_02/03150849382.jpg">
                  <p>副主席：孙伯勇</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03125514447.jpg">
                  <p>副主席：陈晓军</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03125236991.jpg">
                  <p>副主席：林建华</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03125649266.jpg">
                  <p>副主席：钱峰</p>
              </div>
          </div>
          <p>杭州市总商会企业家副会长</p>
          <div class="content_box after">
              <div class="content_box_inside">
                  <img border="0" src="/upload/2006-10-2616-15-29.7055475.jpg">
                  <p>副会长：高德康</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03094705112.jpg">
                  <p>副会长：郑晓峰</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/upload/2006-10-2310-45-59.7055475.jpg">
                  <p>副会长：许荣根</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/upload/2006-10-249-12-35.7055475.jpg">
                  <p>副会长：陶晓莺</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01102150659.jpg">
                  <p>副会长：陈建华</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/upload/2006-10-2310-40-26.7055475.jpg">
                  <p>副会长：黄 靖</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01102049678.jpg">
                  <p>副会长：姜广勇</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01102010425.jpg">
                  <p>副会长：林东</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01102119107.jpg">
                  <p>副会长：朱军岷</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01102303176.jpg">
                  <p>副会长：何军</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2011_08/01102355681.jpg">
                  <p>副会长：陈承守</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03151608268.jpg"> -->
                  <img border="0" src="/uploadPic/2017_02/03151608268.jpg">
                  <p>副会长：卢西</p>
              </div>
               <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03141820328.jpg">
                  <p>副会长：徐建祥</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03155201770.JPG"> -->
                  <img border="0" src="/uploadPic/2017_02/03155201770.jpg">
                  <p>副会长：王大安</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03142436285.jpg">
                  <p>副会长：应福友</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03142529547.jpg">
                  <p>副会长：杨永明</p>
              </div>
              <div class="content_box_inside">
                  <img border="0" src="/uploadPic/2016_11/03142602898.gif">
                  <p>副会长：范渊</p>
              </div>
              <div class="content_box_inside">
                  <!-- <img border="0" src="/uploadPic/2016_11/03142623354.jpg"> -->
                  <img border="0" src="/uploadPic/2017_02/03142623354.jpg">
                  <p>副会长：吴瑞录</p>
              </div>
          </div>
      </div>
      <div id="item2" class="mui-control-content">
          <div class="content_box">
              <h2 align="center">中国工商业联合会章程</h2>
              <h3 align="center">（中华全国工商业联合会第十一次会员代表大会2012年12月9日通过）</h3>
              <div align="left" class="content_type">&nbsp;&nbsp;&nbsp;&nbsp;<strong>总则<br></strong>&nbsp;&nbsp;&nbsp;&nbsp;中国工商业联合会（简称工商联）是中国共产党领导的面向工商界、以非公有制企业和非公有制经济人士为主体的人民团体和商会组织，是党和政府联系非公有制经济人士的桥梁纽带，是政府管理和服务非公有制经济的助手。工商联工作是党的统一战线工作和经济工作的重要内容。工商联事业是中国特色社会主义事业的重要组成部分。<br>&nbsp;&nbsp;&nbsp;&nbsp;工商联以中华人民共和国宪法为根本准则，按照章程开展工作。<br>&nbsp;&nbsp;&nbsp;&nbsp;工商联高举中国特色社会主义伟大旗帜，以邓小平理论、“三个代表”重要思想、科学发展观为指导，坚持党的领导，坚持公有制为主体、多种所有制经济共同发展的基本经济制度，围绕经济建设中心，服务党和国家工作大局，继续解放思想，坚持改革开放，推动科学发展，促进社会和谐。<br>&nbsp;&nbsp;&nbsp;&nbsp;工商联具有统战性、经济性、民间性有机统一的基本特征，以非公有制经济健康发展和非公有制经济人士健康成长为工作主题。充分发挥在非公有制经济人士思想政治工作中的引导作用，在非公有制经济人士参与国家政治生活和社会事务中的重要作用，在政府管理和服务非公有制经济中的助手作用，在行业协会商会改革发展中的促进作用，在构建和谐劳动关系、加强和创新社会管理中的协同作用，是工商联的主要职能。<br>&nbsp;&nbsp;&nbsp;&nbsp;工商联以建设政治坚定、特色鲜明、机制健全、服务高效、作风优良的人民团体和商会组织为目标，全面加强思想建设、组织建设、作风建设、反腐倡廉建设、制度建设，不断增强凝聚力、影响力、执行力；坚持团结、服务、引导、教育的方针，引导非公有制经济人士坚决拥护中国共产党的领导、坚定不移走中国特色社会主义道路，积极投身社会主义经济建设、政治建设、文化建设、社会建设和生态文明建设，为把我国建设成为富强民主文明和谐的社会主义现代化国家，为实现祖国完全统一和中华民族伟大复兴而奋斗。<br>&nbsp;&nbsp;&nbsp;&nbsp;<strong>第一章职能与任务<br></strong>&nbsp;&nbsp;&nbsp;&nbsp;第一条加强和改进非公有制经济人士思想政治工作。<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）引导非公有制经济人士践行社会主义核心价值体系，树立中国特色社会主义共同理想，树立义利兼顾、以义为先理念，学习、贯彻党和国家的方针政策，发扬自我教育的优良传统，自觉地把自身企业的发展与国家的发展结合起来，把个人富裕与全体人民的共同富裕结合起来，把遵循市场法则与发扬社会主义道德结合起来，爱国、敬业、诚信、守法、贡献，做合格的中国特色社会主义事业建设者。宣传表彰他们中的先进典型。<br>&nbsp;&nbsp;&nbsp;&nbsp;（二）引导非公有制经济人士弘扬中华传统美德，弘扬时代新风，致富思源、富而思进，积极承担社会责任，热心公益事业，投身光彩事业，加强企业文化建设，支持企业党建工作，为基层党组织开展活动、发挥作用提供必要条件。<br>&nbsp;&nbsp;&nbsp;&nbsp;第二条参与政治协商，发挥民主监督作用，积极参政议政。<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）密切同非公有制经济人士的联系，深入了解他们的意愿和要求，向党和政府提出相关意见和建议。<br>&nbsp;&nbsp;&nbsp;&nbsp;（二）围绕贯彻落实党的路线方针政策，参与国家有关政策、法律法规的制定和贯彻执行，促进非公有制经济市场环境、政策环境、法治环境、社会环境的改善。<br>&nbsp;&nbsp;&nbsp;&nbsp;（三）帮助非公有制经济代表人士提高参政议政能力和水平，积极反映社情民意，有序参与政治生活和社会事务。<br>&nbsp;&nbsp;&nbsp;&nbsp;（四）做好非公有制经济代表人士的发现、培养、推荐和管理工作。<br>&nbsp;&nbsp;&nbsp;&nbsp;第三条协助政府管理和服务非公有制经济。<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）积极探索建立适应社会主义市场经济要求的服务载体和机制，为非公有制企业提供政策、信息、法律、融资、技术、人才等方面服务，引导非公有制企业按照科学发展观要求，加快经济发展方式转变和产业优化升级，推进结构调整和自主创新，不断增强市场竞争能力、抵御风险能力和可持续发展能力。<br>&nbsp;&nbsp;&nbsp;&nbsp;（二）增强与香港特别行政区、澳门特别行政区和台湾地区工商界的联系，促进经贸合作。积极开展民间外交，加强同国外工商界的交流合作，为非公有制企业开展国际合作提供服务。<br>&nbsp;&nbsp;&nbsp;&nbsp;（三）承办政府和有关部门委托事项。组织非公有制企业参与实施国家区域发展战略，为地方经济建设服务，促进城乡、区域统筹协调发展。<br>&nbsp;&nbsp;&nbsp;&nbsp;第四条促进行业协会商会改革发展。<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）履行社会团体业务主管单位职责，指导和推动商会组织依照法律法规和本章程制定商会章程，完善法人治理结构，规范内部管理，发挥宣传政策、提供服务、反映诉求、维护权益、加强自律的作用，培育和发展中国特色商会组织。<br>&nbsp;&nbsp;&nbsp;&nbsp;（二）参与行业协会商会政策法律的制定。指导商会反映行业发展动态，促进行业健康发展。<br>&nbsp;&nbsp;&nbsp;&nbsp;第五条参与协调劳动关系，协同社会管理，促进社会和谐稳定。<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）参与协调劳动关系三方会议，同政府部门、工会组织和其他有关企业方代表一道，共同推动劳动关系立法、健全劳动标准体系和劳动关系协调机制，共同研究解决劳动关系中的重大问题，参与劳动争议调解、仲裁。<br>&nbsp;&nbsp;&nbsp;&nbsp;（二）引导非公有制企业依法与工会就职工工资、生活福利、社会保险等涉及职工切身利益问题进行平等协商，签订集体合同。<br>&nbsp;&nbsp;&nbsp;&nbsp;（三）协调处理投资者利益和劳动者权益的关系，引导非公有制企业构建和谐劳动关系，积极创造就业岗位，严格遵守国家相关法律法规和政策措施，尊重和维护员工合法权益，协助指导非公有制企业党建工作，推动其建立工会等群团组织，积极开展活动。<br>&nbsp;&nbsp;&nbsp;&nbsp;第六条反映非公有制企业和非公有制经济人士利益诉求，维护其合法权益。参与经济纠纷的调解、仲裁。<br>&nbsp;&nbsp;&nbsp;&nbsp;第七条依法加强会产管理和保护。<br>&nbsp;&nbsp;&nbsp;&nbsp;<strong>第二章会员<br></strong>&nbsp;&nbsp;&nbsp;&nbsp;第八条凡承认本章程，自愿参加工商联的一个组织，承诺履行会员义务的企业、团体和个人，可以申请入会。<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）各类企业入会申请经批准后，为企业会员。<br>&nbsp;&nbsp;&nbsp;&nbsp;企业会员的主体是非公有制企业，主要包括私营企业、非公有制经济成分控股的有限责任公司和股份有限公司、港澳投资企业等。<br>&nbsp;&nbsp;&nbsp;&nbsp;（二）具有法人资格的行业协会、行业商会、异地商会、私营企业协会、个体劳动者协会等工商社团和其他有关社会组织，入会申请经批准后，为团体会员。<br>&nbsp;&nbsp;&nbsp;&nbsp;工商联所属商会为团体会员。<br>&nbsp;&nbsp;&nbsp;&nbsp;（三）非公有制企业主要出资人和经营者、个体工商户等，入会申请经批准后，为个人会员。<br>&nbsp;&nbsp;&nbsp;&nbsp;与工商联工作有联系的有关人士、在内地投资的港澳工商界人士，可以申请成为个人会员。<br>&nbsp;&nbsp;&nbsp;&nbsp;与工商联建立工作联系的单位代表，经协商，可被邀请作为个人会员入会。<br>&nbsp;&nbsp;&nbsp;&nbsp;原工商业者均为个人会员。<br>&nbsp;&nbsp;&nbsp;&nbsp;第九条实行会员入会自愿和退会自由的原则。<br>&nbsp;&nbsp;&nbsp;&nbsp;各级工商联可根据本章程规定与实际情况，制定具体的会员入会条件及办理入、退会手续的办法，并报上一级工商联备案。<br>&nbsp;&nbsp;&nbsp;&nbsp;第十条会员如违反本章程或触犯刑律，应停止或取消其会籍。<br>&nbsp;&nbsp;&nbsp;&nbsp;第十一条地方各级工商联的会员，同时也是上级工商联的会员。<br>&nbsp;&nbsp;&nbsp;&nbsp;第十二条会员有下列权利：<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）选举权、被选举权和表决权；<br>&nbsp;&nbsp;&nbsp;&nbsp;（二）向工商联反映意见、要求和建议；<br>&nbsp;&nbsp;&nbsp;&nbsp;（三）参加工商联组织的参观考察、学习培训等活动；<br>&nbsp;&nbsp;&nbsp;&nbsp;（四）接受工商联提供的服务；<br>&nbsp;&nbsp;&nbsp;&nbsp;（五）要求工商联维护其合法权益；<br>&nbsp;&nbsp;&nbsp;&nbsp;（六）对工商联工作进行监督。<br>&nbsp;&nbsp;&nbsp;&nbsp;第十三条会员有下列义务：<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）遵守本章程；<br>&nbsp;&nbsp;&nbsp;&nbsp;（二）执行组织决议；<br>（三）按规定交纳会费；（四）关心支持工商联工作；<br>&nbsp;&nbsp;&nbsp;&nbsp;（五）接受组织监督；<br>&nbsp;&nbsp;&nbsp;&nbsp;（六）办理组织委托的事项。<br>&nbsp;&nbsp;&nbsp;&nbsp;<strong>第三章组织<br></strong>&nbsp;&nbsp;&nbsp;&nbsp;第十四条工商联按国家行政区划设置全国组织和地方组织：中华全国工商业联合会为全国组织，简称全国工商联；省、自治区、直辖市工商联和新疆生产建设兵团工商联，市（地区、自治州、盟、直辖市的区）工商联为地方组织。县（市、旗、省辖市的区）工商联既为地方组织又为基层组织。工商联所属商会为基层组织。<br>&nbsp;&nbsp;&nbsp;&nbsp;第十五条工商联可设立行业商会（同业公会）、乡镇商会、街道商会、园区商会、异地商会等商会组织，并作为其业务主管单位。<br>&nbsp;&nbsp;&nbsp;&nbsp;第十六条工商联的组织原则是民主集中制。上级工商联对下级工商联具有指导关系。<br>&nbsp;&nbsp;&nbsp;&nbsp;第十七条工商联的最高权力机构是代表大会（会员大会）。它的职权是：<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）听取和审议执行委员会报告；<br>（二）选举执行委员会；（三）讨论决定工商联的重要事项。<br>&nbsp;&nbsp;&nbsp;&nbsp;中国工商业联合会全国代表大会负责修改章程。<br>&nbsp;&nbsp;&nbsp;&nbsp;第十八条工商联代表大会（会员大会），每五年召开一次。必要时可以提前或延期召开。<br>&nbsp;&nbsp;&nbsp;&nbsp;代表大会（会员大会）由执行委员会召集。大会期间由选举产生的主席团主持会议。<br>&nbsp;&nbsp;&nbsp;&nbsp;第十九条工商联代表大会的代表，按照协商推选方式产生，根据需要也可以特邀部分代表。<br>&nbsp;&nbsp;&nbsp;&nbsp;代表大会代表的名额和分配办法，由执行委员会或授权常务委员会决定。<br>&nbsp;&nbsp;&nbsp;&nbsp;第二十条工商联的执行委员会，在代表大会（会员大会）闭会期间，是工商联的最高领导机构，其职权是：<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）贯彻执行代表大会或会员大会的决议；<br>&nbsp;&nbsp;&nbsp;&nbsp;（二）听取和审议常务委员会的报告；<br>&nbsp;&nbsp;&nbsp;&nbsp;（三）讨论和决定工作任务；<br>&nbsp;&nbsp;&nbsp;&nbsp;（四）选举主席、副主席、常务委员。<br>&nbsp;&nbsp;&nbsp;&nbsp;执行委员会每届任期五年，全体会议每年召开一次。<br>&nbsp;&nbsp;&nbsp;&nbsp;下一届执行委员会委员名额分配、产生办法由上一届执行委员会或授权常务委员会决定。<br>&nbsp;&nbsp;&nbsp;&nbsp;第二十一条执行委员会委员的责任和义务：<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）坚持正确的政治方向，认真执行党的路线方针政策；<br>&nbsp;&nbsp;&nbsp;&nbsp;（二）发挥参政议政作用，就经济社会发展中的重要问题建言献策；<br>&nbsp;&nbsp;&nbsp;&nbsp;（三）热爱工商联工作，参加组织的会议活动；<br>&nbsp;&nbsp;&nbsp;&nbsp;（四）执行工商联的各项决议；<br>&nbsp;&nbsp;&nbsp;&nbsp;（五）广泛联系会员，反映会员的意见和要求；<br>&nbsp;&nbsp;&nbsp;&nbsp;（六）对工商联工作提出意见和建议。<br>&nbsp;&nbsp;&nbsp;&nbsp;第二十二条常务委员会由主席、副主席、秘书长、常务委员组成，每届任期与执行委员会相同，在执行委员会闭会期间行使执行委员会职权：<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）贯彻实施执行委员会的决议；<br>（二）讨论研究工作任务；（三）对执行委员会负责并报告工作。<br>&nbsp;&nbsp;&nbsp;&nbsp;常务委员会会议每年召开两次。<br>&nbsp;&nbsp;&nbsp;&nbsp;下一届常务委员会委员名额分配、产生办法由上一届执行委员会或授权常务委员会决定。<br>&nbsp;&nbsp;&nbsp;&nbsp;县级工商联视情况决定是否设置常务委员会。<br>&nbsp;&nbsp;&nbsp;&nbsp;第二十三条主席主持会务，副主席协助主席工作。主席、副主席组成主席会议，研究决定重要事项。<br>&nbsp;&nbsp;&nbsp;&nbsp;副主席分为专职副主席和兼职副主席。专职副主席连续任职原则上不超过两届。全国工商联兼职副主席原则上不连续任职，地方工商联兼职副主席连续任职原则上不超过两届。<br>&nbsp;&nbsp;&nbsp;&nbsp;全国工商联和省级工商联设常务副主席，由同级执行委员会选举产生。<br>&nbsp;&nbsp;&nbsp;&nbsp;地方工商联秘书长由本级执行委员会选举产生，是主席会议的组成人员。<br>&nbsp;&nbsp;&nbsp;&nbsp;每届执行委员会产生的领导机构和领导人，在下届代表大会（会员大会）开会期间，继续主持经常工作，直到下届执行委员会产生新的领导机构和领导人为止。<br>&nbsp;&nbsp;&nbsp;&nbsp;第二十四条执行委员会会议、常务委员会会议、主席会议在特殊情况下可以通讯方式召开。<br>&nbsp;&nbsp;&nbsp;&nbsp;第二十五条未经批准，执行委员三次不参加执行委员会会议，应免去其执行委员职务；常务委员三次不参加常务委员会会议，应免去其常务委员职务。<br>&nbsp;&nbsp;&nbsp;&nbsp;第二十六条工商联的执行委员会、常务委员会组成人员，可在届中进行调整，调整的人员由执行委员会通过，或由常务委员会通过，提交执行委员会确认。<br>&nbsp;&nbsp;&nbsp;&nbsp;地方工商联换届时应向上一级工商联报告筹备情况，选举结果报上一级工商联备案。<br>&nbsp;&nbsp;&nbsp;&nbsp;第二十七条工商联根据工作需要设立工作部门和专门委员会。<br>&nbsp;&nbsp;&nbsp;&nbsp;第二十八条地方工商联新设或撤并，应报请同级党委批准，并报上级工商联备案。<br>&nbsp;&nbsp;&nbsp;&nbsp;第二十九条中华全国工商业联合会又称中国民间商会，地方工商联为地方商会。<br>&nbsp;&nbsp;&nbsp;&nbsp;会长由工商联主席兼任，副会长原则上由工商联专职副主席、非公有制经济代表人士兼（担）任，会长、副会长由工商联执行委员会选举产生。<br>&nbsp;&nbsp;&nbsp;&nbsp;中国民间商会副会长中的非公有制经济代表人士原则上不连续任职，地方商会副会长中的非公有制经济代表人士连续任职原则上不超过两届。<br>&nbsp;&nbsp;&nbsp;&nbsp;<strong>第四章工作人员<br></strong>&nbsp;&nbsp;&nbsp;&nbsp;第三十条工商联机关应遵照中华人民共和国公务员法的规定，加强对工作人员的培养、考核、激励和监督，建设一支政治强、业务精、作风正的公务员队伍。<br>&nbsp;&nbsp;&nbsp;&nbsp;第三十一条工商联工作人员应当做到：<br>&nbsp;&nbsp;&nbsp;&nbsp;（一）高举中国特色社会主义伟大旗帜，认真学习马克思列宁主义、毛泽东思想、邓小平理论、“三个代表”重要思想、科学发展观，学习党的理论和路线方针政策以及现代市场经济、现代科技、现代管理、法律等方面知识，具有履行职责所需要的理论、政策、业务水平；<br>&nbsp;&nbsp;&nbsp;&nbsp;（二）树立中国特色社会主义理想信念，具有较强的事业心和责任感，热爱工商联事业，解放思想，勇于创新，忠于职守，勤奋工作，具备较强的政治把握能力、调查研究能力、群众工作能力、落实推进能力；<br>&nbsp;&nbsp;&nbsp;&nbsp;（三）坚持求真务实、深入基层、调查研究，树立良好作风，密切联系会员和非公有制经济人士，增强服务意识；<br>&nbsp;&nbsp;&nbsp;&nbsp;（四）严于律己、勤政廉洁、顾全大局、遵守纪律，自觉接受组织和会员的监督。<br>&nbsp;&nbsp;&nbsp;&nbsp;<strong>第五章会徽<br></strong>&nbsp;&nbsp;&nbsp;&nbsp;第三十二条工商联的会徽为桥梁纽带造型组成的图案。<br>&nbsp;&nbsp;&nbsp;&nbsp;工商联的会徽，可作为会章佩带；可在工商联组织的办公地点、活动场所、会议会场悬挂；可作为纪念品、办公用品上的标志；未经授权，不得作商业用途。<br>&nbsp;&nbsp;&nbsp;<strong>&nbsp;第六章附则</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;第三十三条本章程为各级工商联（中国民间商会和地方商会）的统一章程，经中国工商业联合会全国代表大会通过。<br>&nbsp;&nbsp;&nbsp;&nbsp;第三十四条本章程的解释权属于中华全国工商业联合会。<br></div>
          </div>
      </div>
      <div id="item3" class="mui-control-content">
          <div class="content_box">
              <h2 align="center">杭州市工商联会员发展管理办法（试行）</h2>
                  <div align="left">&nbsp;</div>
                  <div align="left">&nbsp;&nbsp;&nbsp; 为进一步健全杭州市工商联会员及基层商会管理制度，加强会员发展及基层商会管理工作，根据《中国工商业联合会章程》的有关规定，结合本会的实际情况，特制定办法如下：</div>
                  <div align="left">&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <div align="left"><b>一、会员入会条件：</b></div>
                  <div align="left">&nbsp;&nbsp;&nbsp;&nbsp;凡承认《中国工商业联合会章程》自愿参加杭州市工商联组织，承诺履行会员义务的企业、团体和个人，可以申请入会。</div>
                  <div>&nbsp;<b>（一）</b><b>企业会员入会条件</b><b></b></div>
                  <div>l、企业会员的主体是非公有制企业，主要包括私营企业、非公有制经济成分控股的有限责任公司和股份有限公司、港澳投资企业等。</div>
                  <div>2、法人代表应具备较高的政治素质，遵纪守法，合法经营，自觉遵守本会章程，热心工商联工作，有较强的社会责任心；</div>
                  <div>3、在杭州市工商行政管理部门注册并年检合格；</div>
                  <div>4、在同行业中具有代表性；</div>
                  <div>5、注册资本100万元或资产总额达到1000万元以上的；民营高新技术企业、服务型企业、中介机构可适当放宽注册资本和资产总额限制。</div>
                  <div align="left">6、注册登记不在杭州市范围但经营地点在杭州市的企业。</div>
                  <div><b>(</b><b>二)</b><b> </b><b>团体会员入会条件</b><b></b></div>
                  <div align="left">1、依法在社团管理部门登记注册并年检合格的行业协会、行业商会、异地商会、私营企业协会、个体劳动者协会等工商社团和其他有关社会组织；</div>
                  <div align="left">2、社会团体的主要成员应是非公有制企业或是非公有制经济人士；</div>
                  <div align="left">3、社会团体的成立运作须满一届以上，组织严谨，制度规范，活动开展正常，无重大群体性事件发生。</div>
                  <div><b>（三）</b><b>个人会员入会条件</b><b></b></div>
                  <div align="left">1、与我会工作有联系、业务水平较高、具有一定社会影响的经济工作者、经济理论工作者、法律工作者及其他有关人士；</div>
                  <div align="left">2、与工商联工作有联系的有关人士、在内地投资的港澳工商界人士，可以申请成为本会个人会员；</div>
                  <div align="left">3、与工商联建立工作联系的单位代表，经协商可被邀请为个人会员入会。</div>
                  <div align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                  <div align="left">&nbsp;&nbsp;<b>二、</b><b>入会程序</b><b></b></div>
                  <div align="left"><b>（一）领取申请表</b><b></b></div>
                  <div align="left">凡申请加入工商联的企业、团体和个人，到工商联的各级组织领取入会申请表。</div>
                  <div align="left"><b>（二）提交材料</b><b></b></div>
                  <div align="left"><b>1</b><b>、企业会员须提供的材料</b><b></b></div>
                  <div align="left">（1）、由企业法定代表人签名并加盖公章的入会申请表；</div>
                  <div align="left">（2）、营业执照（副本）复印件；</div>
                  <div align="left">（3）、企业上一年度工商行政管理部门年检合格证明的复印件；</div>
                  <div align="left">（4）、法人代表三张两寸免冠照片；</div>
                  <div align="left"><b>2</b><b>、团体会员须提供的材料</b><b></b></div>
                  <div align="left">（1）、由社会团体法定代表人签名并加盖公章的入会申请表；</div>
                  <div align="left">（2）、社团登记证和机构代码证复印件；</div>
                  <div align="left">（3）、社团章程、成员名册及各项制度等；</div>
                  <div align="left">（4）、社团上一年度经社团登记管理部门年检合格的报告书。</div>
                  <div align="left"><b>3</b><b>、个人会员须提供的材料</b></div>
                  <div align="left">（1）、入会申请表；</div>
                  <div align="left">（2）、身份证复印件和相关资格证、职称证书等的复印件。</div>
                  <div align="left"><b>（三）资格审查、审批</b></div>
                  <div align="left">本会会员处收到申请表等材料后，对申请入会的企业、社团或个人进行资格审查和考察，依据考察情况提出初审意见，经分管领导同意，提交主席办公会审议，符合条件的由主席办公会议予以批准，主要领导签发批复。</div>
                  <div align="left"><b>（四）入</b><b>会批复</b><b></b></div>
                  <div align="left">本会会员处向获得批准的申请单位（或个人）发入会批复，申请单位（或个人）即成为杭州市工商联会员。</div>
                  <div align="left"><b>（</b><b>五）实行会员入会自愿和退会自由的原则。</b></div>
                  <p><a href="/uploadPic/2014_11/06111037940.doc" target="_blank">杭州市工商业联合会、杭州市总商会团体会员入会申请表.doc</a><br><a href="/uploadPic/2014_11/06111050251.doc" target="_blank">杭州市工商业联合会、杭州市总商会个人会员入会申请表.doc</a></p>
                  <p><a href="/uploadPic/2014_11/06111102274.doc" target="_blank">杭州市工商业联合会、杭州市总商会企业会员入会申请表.doc</a></p></span>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Panel, Swiper, SwiperItem, Grid, GridItem, Scroller, Flexbox, FlexboxItem } from 'vux'
import router from '@/router'
import $ from 'jquery'
export default {
  name: 'productInfo',
  components: {
    Panel, Swiper, SwiperItem, Grid, GridItem, Scroller, Flexbox, FlexboxItem
  },
  methods: {
    scrollTo(index){
      const scrollTop = $("#all_content").scrollTop();
      $("#all_content").animate({scrollTop: scrollTop + $(`#item${index}`).position().top}, 500);
    }
  },
  mounted() {
  },
  updated() {
  }
}
</script>
<style lang='less' scoped>
.top1{
  position: relative;
  padding: 11px 15px;
}
.rightlogo{
  position: absolute;
  left: 15px;
  top: 11px;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  overflow: hidden;
  &>img{
    display: block;
    width: 100%;
    height: 100%;
  }
}
.meta{
  padding-left: 88px;
  width: 100%;
  .title_top{
    color: #000;
    font-size: 16px;
    margin-bottom: 1px!important;
  }
  .icon_top {
    line-height: 1;
    margin-bottom: 1px!important;
    >img {
      display: inline-block;
      width: 15px;
      height: 15px;
      vertical-align: middle;
      margin-right: 6px;
    }
    >span {
      vertical-align: middle;
      font-size: 12px;
      color: #aaa;
    }
  }
}
.grid{
  padding: 10px 0 5px;
  background-color: #fff;
  &:before, &:after{
    display: none;
  }
}
.grid-item{
  padding: 2px 10px !important;
  &:nth-child(3n):before{
    display: none;
  }
  &:after{
    display: none;
  }
}
.grid-item-icon{
  width: 20px;
  height: 20px;
}
.grid-item-label{
  color: #333;
  font-size: 12px;
}
#all_content{
  position: absolute;
  top: 169px;
  bottom: 0;
  left: 0;
  right: 0;
}
.content_box {
  padding: 10px;
  background-color: #fff;
  margin-top: 10px;
}
.mui-control-content {
  position: relative;
  border-top: 10px solid #e5e5e5;
  background-color: #fff;
  h3 {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 24px;
    text-indent: 0;
  }
}
p {
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 10px;
    color: #8f8f94;
}
#item0 p, #item0 div, #item3 p, #item3 div {
  font-size: 14px;
  color: #333;
  line-height: 28px;
  text-indent: 2em;
}
#item1>p {
    text-align: center;
    margin: 10px;
    color: #333;
}
.content_box_inside {
  width: 45%;
  margin-right: 10%;
  float: left;
  > img {
    display: inline-block;
    width: 100%;
    height: 160px;
  }
  &:nth-child(2n) {
    margin-right: 0;
  }
}
.content_type {
    font-size: 14px;
    color: #333;
    line-height: 28px;
}
</style>
<style lang='less'>
.grid-item2{
  .weui-grid__icon{
    width: 20px;
    height: 20px;
  }
  .weui-grid__label{
    margin-top: 0!important;
  }
}
</style>
