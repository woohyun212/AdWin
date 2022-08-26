"""
각종 인증 JWT, OAuth2, Cookies, Sections 에 대한 인증을 처리
"""


def is_valid(user_id: str):
    """
    Check if user_id is valid
    :param user_id:
    # :param cookie:
    :return: boolean
    """
    # user_id 를 받아서 cookie 값과 대조한 후
    # 여러 인증 통과시 True 반환.
    if user_id:
        return True
    return False
